import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(_request: NextRequest) {
    const inquiries = await prisma.inquiry.findMany({
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            receiptNumber: true,
            status: true,
            type: true,
            createdAt: true,
            templeNameSnapshot: true,
            user: true,
            message: true,
            adminNotes: true,
        },
    });

    const header = '受付番号,受信日時,種別,施設名,氏名,ステータス,メッセージ\n';
    const rows = inquiries.map(inq => {
        const user = inq.user as Record<string, string> | null;
        const name = user ? `${user.lastName ?? ''}${user.firstName ?? ''}` : '';
        const date = new Date(inq.createdAt).toLocaleString('ja-JP');
        const statusMap: Record<string, string> = { new: '新着', inProgress: '対応中', done: '完了' };
        const status = statusMap[inq.status] || inq.status;
        const message = (inq.message || '').replace(/"/g, '""');
        return `"${inq.receiptNumber}","${date}","${inq.type || ''}","${inq.templeNameSnapshot || ''}","${name}","${status}","${message}"`;
    });

    const csv = '\uFEFF' + header + rows.join('\n');

    return new NextResponse(csv, {
        headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': `attachment; filename="inquiries_${new Date().toISOString().slice(0, 10)}.csv"`,
        },
    });
}
