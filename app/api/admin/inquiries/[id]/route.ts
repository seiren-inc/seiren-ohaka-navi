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
        const { status, adminNotes, requestId = 'no-request-id' } = body;

        console.log(`[INQUIRY_UPDATE_START] requestId=${requestId} id=${id} status=${status}`);

        const updatedInquiry = await prisma.inquiry.update({
            where: { id: id },
            data: {
                status: status !== undefined ? status : undefined,
                adminNotes: adminNotes !== undefined ? adminNotes : undefined,
            }
        });

        console.log(`[INQUIRY_UPDATED] requestId=${requestId} id=${updatedInquiry.id}`);

        return NextResponse.json({
            success: true,
            saved: {
                id: updatedInquiry.id,
                updatedAt: updatedInquiry.updatedAt,
                status: updatedInquiry.status
            },
            requestId
        });
    } catch (error) {
        console.error('[INQUIRY_UPDATE_FAILED]', error);
        return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 });
    }
}
