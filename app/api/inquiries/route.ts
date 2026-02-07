import { NextResponse } from 'next/server';
import { InquiryDB } from '../../../lib/inquiry-db';
import { Inquiry } from '../../../lib/store';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 環境情報ログ
        const isVercel = process.env.VERCEL === '1';
        console.log('========================================');
        console.log('[INQUIRY_API] 新規問い合わせ受信');
        console.log('[INQUIRY_API] 環境:', isVercel ? 'Vercel 本番' : 'ローカル開発');
        console.log('[INQUIRY_API] タイムスタンプ:', new Date().toISOString());
        console.log('========================================');

        // 受信データの詳細ログ
        console.log('[INQUIRY_API] 受信データ:');
        console.log(JSON.stringify(body, null, 2));

        // --- PERSISTENCE START ---
        // Construct Inquiry Object for DB (Server-side ID generation)
        const newInquiry: Inquiry = {
            id: `inq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            receiptNumber: `R-${Date.now().toString().slice(-4)}`,
            createdAt: new Date().toISOString(),
            status: 'new',
            ...body
        };

        console.log('[INQUIRY_API] 生成ID:', newInquiry.id);
        console.log('[INQUIRY_API] 受付番号:', newInquiry.receiptNumber);

        InquiryDB.save(newInquiry);

        if (isVercel) {
            console.log('[INQUIRY_API] ⚠️ Vercel 環境: データはログのみに記録されます');
            console.log('[INQUIRY_API] 本番運用時は DB への移行が必要です');
        }

        console.log('========================================');

        // Return received body for debugging
        return NextResponse.json({
            success: true,
            message: "お問い合わせを受け付けました",
            receiptNumber: newInquiry.receiptNumber,
            id: newInquiry.id
        }, { status: 200 });
    } catch (error) {
        console.error('[INQUIRY_API] エラー発生:', error);
        return NextResponse.json({
            success: false,
            message: "サーバーエラーが発生しました"
        }, { status: 500 });
    }
}
