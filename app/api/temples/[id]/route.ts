import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const temple = await prisma.temple.findUnique({
            where: { id: id },
            include: { plans: { orderBy: { order: 'asc' } } }
        });

        if (!temple) {
            return NextResponse.json({ error: 'Temple not found' }, { status: 404 });
        }

        return NextResponse.json(temple, { headers: { 'Cache-Control': 'no-store' } });
    } catch (error) {
        console.error('[TEMPLE_GET_ID_ERROR]', error);
        return NextResponse.json({ error: 'Failed to fetch temple' }, { status: 500 });
    }
}

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { plans, requestId = 'no-request-id', version, ...templeData } = body;

        console.log(`[TEMPLE_UPDATE_START] requestId=${requestId} id=${id} version=${version}`);

        // --- Phase B: Replacement Cleanup ---
        // Fetch current to check for image changes
        const current = await prisma.temple.findUnique({
            where: { id: id },
            select: { mainImage: true }
        });

        const oldMainImagePath = current?.mainImage ? current.mainImage.split('/public/media/')[1] : null;
        const newMainImagePath = templeData.mainImage ? templeData.mainImage.split('/public/media/')[1] : null;

        // Optimistic Locking: update only if version matches
        try {
            const updateResult = await prisma.temple.updateMany({
                where: {
                    id: id,
                    version: version
                },
                data: {
                    ...templeData,
                    id: undefined,
                    version: { increment: 1 }
                }
            });

            if (updateResult.count === 0) {
                return NextResponse.json({
                    error: 'Conflict: The temple has been updated by another user.',
                    code: 'CONFLICT'
                }, { status: 409 });
            }

            const updatedTemple = await prisma.temple.findUnique({
                where: { id: id }
            });

            if (!updatedTemple) throw new Error('Updated temple not found');

            // If update successful and mainImage changed, delete old from storage
            if (oldMainImagePath && newMainImagePath && oldMainImagePath !== newMainImagePath) {
                console.log(`[CLEANUP_REPLACEMENT] Deleting old image: ${oldMainImagePath}`);
                supabase.storage.from('media').remove([oldMainImagePath]).then(({ error }) => {
                    if (error) console.error('[CLEANUP_REPLACEMENT_FAIL]', error);
                    else console.log('[CLEANUP_REPLACEMENT_OK] Removed old image');
                });
            }

            console.log(`[TEMPLE_SAVED] requestId=${requestId} id=${updatedTemple.id} nextVersion=${updatedTemple.version}`);

            return NextResponse.json({
                success: true,
                saved: {
                    id: updatedTemple.id,
                    savedAt: updatedTemple.updatedAt,
                    version: updatedTemple.version
                },
                requestId
            });
        } catch (error: any) {
            // Prisma error P2025: Record to update not found (or version mismatch)
            if (error.code === 'P2025') {
                return NextResponse.json({
                    error: 'Conflict: The temple has been updated by another user. Please reload.',
                    code: 'CONFLICT'
                }, { status: 409 });
            }
            throw error;
        }
    } catch (error) {
        console.error('[TEMPLE_UPDATE_FAILED]', error);
        return NextResponse.json({ error: 'Failed to update temple' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        console.log(`[TEMPLE_DELETE_START] id=${id} user=${user.email}`);

        // --- Phase B: Storage Cleanup ---
        try {
            const subfolders = ['main', 'gallery', 'plans'];
            for (const sub of subfolders) {
                const folderPath = `temples/${id}/${sub}`;
                const { data: files, error: listError } = await supabase.storage
                    .from('media')
                    .list(folderPath);

                if (listError) {
                    console.error(`[STORAGE_CLEANUP_WARN] Failed to list ${folderPath}:`, listError);
                    continue;
                }

                if (files && files.length > 0) {
                    const pathsToRemove = files.map(f => `${folderPath}/${f.name}`);
                    const { error: removeError } = await supabase.storage
                        .from('media')
                        .remove(pathsToRemove);

                    if (removeError) {
                        console.error(`[STORAGE_CLEANUP_FAIL] Failed to remove ${folderPath}:`, removeError);
                    } else {
                        console.log(`[STORAGE_CLEANUP_OK] Removed ${pathsToRemove.length} files from ${folderPath}`);
                    }
                }
            }
        } catch (storageErr) {
            console.error('[STORAGE_CLEANUP_CRITICAL_ERROR]', storageErr);
        }

        // --- Database Deletion ---
        await prisma.plan.deleteMany({ where: { templeId: id } });
        await prisma.temple.delete({ where: { id: id } });

        console.log(`[TEMPLE_DELETED] id=${id} user=${user.email}`);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[TEMPLE_DELETE_FAILED]', error);
        return NextResponse.json({ error: 'Failed to delete temple' }, { status: 500 });
    }
}
