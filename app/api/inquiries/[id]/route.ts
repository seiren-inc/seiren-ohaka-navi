import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const inquiry = await prisma.inquiry.findUnique({ where: { id } });
    if (!inquiry) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(inquiry);
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();

        // Inquiry 単一テーブルの既存フィールドのみ更新対象とする
        const allowedKeys = [
            'status', 'adminNotes', 'type', 'category', 'kind',
            'templeId', 'planId', 'planName', 'templeNameSnapshot',
            'message', 'preferredDateTime', 'organizationName',
            'user', 'context',
        ];

        const dataPayload: Record<string, unknown> = {};
        for (const k of allowedKeys) {
            if (body[k] !== undefined) dataPayload[k] = body[k];
        }

        const inquiry = await prisma.inquiry.update({
            where: { id },
            data: dataPayload,
        });

        return NextResponse.json(inquiry);
    } catch (error) {
        console.error('[API/inquiries/[id] PATCH]', error);
        return NextResponse.json({ error: 'Failed to update inquiry' }, { status: 500 });
    }
}
