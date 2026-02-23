import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

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
        const { requestId = 'no-request-id', version, ...planData } = body;

        console.log(`[PLAN_UPDATE_START] requestId=${requestId} id=${id} version=${version}`);

        try {
            const updateResult = await prisma.plan.updateMany({
                where: {
                    id: id,
                    version: version
                },
                data: {
                    ...planData,
                    id: undefined,
                    version: { increment: 1 }
                }
            });

            if (updateResult.count === 0) {
                return NextResponse.json({
                    error: 'Conflict: The plan has been updated by another user.',
                    code: 'CONFLICT'
                }, { status: 409 });
            }

            const updatedPlan = await prisma.plan.findUnique({
                where: { id: id }
            });

            if (!updatedPlan) throw new Error('Updated plan not found');

            console.log(`[PLAN_SAVED] requestId=${requestId} id=${updatedPlan.id} nextVersion=${updatedPlan.version}`);

            return NextResponse.json({
                success: true,
                saved: {
                    id: updatedPlan.id,
                    savedAt: updatedPlan.updatedAt,
                    version: updatedPlan.version
                },
                requestId
            });
        } catch (error: any) {
            if (error.code === 'P2025') {
                return NextResponse.json({
                    error: 'Conflict: The plan has been updated by another user. Please reload.',
                    code: 'CONFLICT'
                }, { status: 409 });
            }
            throw error;
        }
    } catch (error) {
        console.error('[PLAN_UPDATE_FAILED]', error);
        return NextResponse.json({ error: 'Failed to update plan' }, { status: 500 });
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

        // --- Phase B: Storage Cleanup ---
        try {
            const plan = await prisma.plan.findUnique({
                where: { id: id },
                select: { templeId: true }
            });

            if (plan) {
                const folderPath = `temples/${plan.templeId}/plans`;
                const { data: files, error: listError } = await supabase.storage
                    .from('media')
                    .list(folderPath);

                if (!listError && files && files.length > 0) {
                    // Filter files belonging to this plan specifically?
                    // Currently images are stored in a flat list under 'plans'.
                    // If multiple plans share the same folder, we might delete too much if we're not careful.
                    // However, our folder structure is `temples/${templeId}/plans`.
                    // The filenames are UUIDs. We only know which ones belong to this plan if we read the Plan record.

                    const currentPlan = await prisma.plan.findUnique({ where: { id: id }, select: { images: true } });
                    if (currentPlan?.images && currentPlan.images.length > 0) {
                        const pathsToRemove = currentPlan.images
                            .map(url => url.split('/public/media/')[1])
                            .filter(Boolean);

                        if (pathsToRemove.length > 0) {
                            const { error: removeError } = await supabase.storage
                                .from('media')
                                .remove(pathsToRemove);

                            if (removeError) console.error('[PLAN_STORAGE_CLEANUP_FAIL]', removeError);
                            else console.log(`[PLAN_STORAGE_CLEANUP_OK] Removed ${pathsToRemove.length} files`);
                        }
                    }
                }
            }
        } catch (storageErr) {
            console.error('[PLAN_STORAGE_CLEANUP_CRITICAL_ERROR]', storageErr);
        }

        // --- Database Deletion ---
        await prisma.plan.delete({
            where: { id: id }
        });

        console.log(`[PLAN_DELETED] id=${id} user=${user.email}`);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[PLAN_DELETE_FAILED]', error);
        return NextResponse.json({ error: 'Failed to delete plan' }, { status: 500 });
    }
}
