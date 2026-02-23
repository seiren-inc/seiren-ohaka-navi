import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const requestId = body.requestId || 'no-request-id';

        console.log(`[INQUIRY_SAVE_START] requestId=${requestId}`);

        // --- 必須バリデーション ---
        if (!body.user?.name || !body.user?.email || !body.user?.phone) {
            return NextResponse.json({
                success: false,
                error: {
                    code: 'VALIDATION_ERROR',
                    message: 'お名前・メールアドレス・電話番号は必須です。',
                    field: !body.user?.name ? 'name' : !body.user?.email ? 'email' : 'phone'
                }
            }, { status: 400 });
        }

        // --- Context Normalization (Phase 2-3) ---
        // 各種フォームから送られる context の表記揺れを吸収し、統一フォーマットにする
        const rawContext = body.context || {};
        const normalizedContext = {
            sourceLabel: rawContext.sourceLabel || body.category || body.kind || 'unknown',
            sourcePath: rawContext.sourcePath || rawContext.ref || '',
            refUrl: rawContext.refUrl || '',
            temple: rawContext.temple || (rawContext.templeId ? { id: rawContext.templeId, name: rawContext.templeName || '' } : undefined),
            plan: rawContext.plan || (rawContext.planId ? { id: rawContext.planId, name: rawContext.planName || '' } : undefined)
        };

        // 不要な undefined を削除
        Object.keys(normalizedContext).forEach(key => {
            if (normalizedContext[key as keyof typeof normalizedContext] === undefined) {
                delete normalizedContext[key as keyof typeof normalizedContext];
            }
        });

        // --- DATABASE PERSISTENCE ---
        const receiptNumber = `R-${Date.now().toString().slice(-6)}`;

        const newInquiry = await prisma.inquiry.create({
            data: {
                receiptNumber,
                status: 'new',
                kind: body.kind || 'general',
                organizationName: body.organizationName,
                type: body.type,
                category: body.category,
                user: body.user,
                templeId: body.templeId || normalizedContext.temple?.id,
                templeNameSnapshot: body.templeNameSnapshot || normalizedContext.temple?.name,
                planId: body.planId || normalizedContext.plan?.id,
                planName: body.planName || normalizedContext.plan?.name,
                context: normalizedContext,
                message: body.message,
                preferredDateTime: body.preferredDateTime,
                version: 0,
            }
        });

        console.log(`[INQUIRY_SAVED] requestId=${requestId} id=${newInquiry.id} receipt=${newInquiry.receiptNumber}`);

        return NextResponse.json({
            success: true,
            id: newInquiry.id,
            saved: {
                id: newInquiry.id,
                savedAt: newInquiry.updatedAt,
                version: newInquiry.version,
                receiptNumber: newInquiry.receiptNumber
            },
            requestId
        }, { status: 200 });
    } catch (error) {
        console.error('[INQUIRY_SAVE_FAILED]', error);
        return NextResponse.json({
            success: false,
            error: {
                code: 'INTERNAL_ERROR',
                message: 'サーバーエラーが発生しました。しばらく時間を置いて再度お試しください。'
            }
        }, { status: 500 });
    }
}
