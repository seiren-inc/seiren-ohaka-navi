import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
    try {
        const supabase = await createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const requestId = body.requestId || 'no-request-id';

        console.log(`[PLAN_SAVE_START] requestId=${requestId} user=${user.email} templeId=${body.templeId}`);

        const newPlan = await prisma.plan.create({
            data: {
                ...body,
                id: undefined,
                requestId: undefined, // ensure not saved
                version: 0,
            }
        });

        console.log(`[PLAN_SAVED] requestId=${requestId} id=${newPlan.id}`);

        return NextResponse.json({
            success: true,
            saved: {
                id: newPlan.id,
                savedAt: newPlan.updatedAt,
                version: newPlan.version
            },
            requestId
        });
    } catch (error) {
        console.error('[PLAN_SAVE_FAILED]', error);
        return NextResponse.json({ error: 'Failed to create plan' }, { status: 500 });
    }
}
