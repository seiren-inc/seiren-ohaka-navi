import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
    try {
        const temples = await prisma.temple.findMany({
            orderBy: { updatedAt: 'desc' }
        });
        return NextResponse.json(temples, { headers: { 'Cache-Control': 'no-store' } });
    } catch (error) {
        console.error('[TEMPLES_GET_API_ERROR]', error);
        return NextResponse.json({ error: 'Failed to fetch temples' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const requestId = body.requestId || 'no-request-id';

        // Log starting event
        console.log(`[TEMPLE_SAVE_START] requestId=${requestId} user=${user.email}`);

        const newTemple = await prisma.temple.create({
            data: {
                ...body,
                id: undefined,
                requestId: undefined, // Remove if present in body
                version: 0, // Initial version
            }
        });

        console.log(`[TEMPLE_SAVED] requestId=${requestId} id=${newTemple.id}`);

        return NextResponse.json({
            success: true,
            saved: {
                id: newTemple.id,
                savedAt: newTemple.updatedAt,
                version: newTemple.version
            },
            requestId
        });
    } catch (error) {
        console.error('[TEMPLE_SAVE_FAILED]', error);
        return NextResponse.json({ error: 'Failed to create temple' }, { status: 500 });
    }
}
