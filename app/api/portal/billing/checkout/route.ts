import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://seiren-ohaka-navi.vercel.app';

const PRICE_ID_MAP: Record<string, string | undefined> = {
    standard: process.env.STRIPE_STANDARD_PRICE_ID,
    sponsor: process.env.STRIPE_SPONSOR_PRICE_ID,
};

export async function POST(req: NextRequest) {
    try {
        const cookieStore = await cookies();
        const email = cookieStore.get('portal_session')?.value;
        if (!email) {
            return NextResponse.json({ error: '未ログインです。' }, { status: 401 });
        }

        // body から planType を取得（未指定は 'standard'）
        let planType = 'standard';
        try {
            const body = await req.json();
            if (body?.planType && PRICE_ID_MAP[body.planType]) {
                planType = body.planType;
            }
        } catch {
            // body なし or JSON でない場合は standard にフォールバック
        }

        const priceId = PRICE_ID_MAP[planType];
        if (!priceId) {
            return NextResponse.json({ error: '指定されたプランの Price ID が未設定です。' }, { status: 500 });
        }

        const templeUser = await prisma.templeUser.findUnique({
            where: { email },
            include: { temple: true },
        });
        if (!templeUser) {
            return NextResponse.json({ error: 'ユーザーが見つかりません。' }, { status: 404 });
        }

        // すでに同等以上のプランであればスキップ
        if (templeUser.temple.planType !== 'free') {
            return NextResponse.json({ error: 'すでに有料プランに加入済みです。' }, { status: 400 });
        }

        // Stripe Customer を取得 or 作成
        let customerId = templeUser.stripeCustomerId;
        if (!customerId) {
            const customer = await stripe.customers.create({
                email: templeUser.email,
                name: templeUser.temple.name,
                metadata: {
                    templeUserId: templeUser.id,
                    templeId: templeUser.templeId,
                },
            });
            customerId = customer.id;
            await prisma.templeUser.update({
                where: { id: templeUser.id },
                data: { stripeCustomerId: customerId },
            });
        }

        // Checkout Session 生成
        const session = await stripe.checkout.sessions.create({
            customer: customerId,
            mode: 'subscription',
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: `${BASE_URL}/portal/dashboard?payment=success`,
            cancel_url: `${BASE_URL}/portal/dashboard?payment=cancel`,
            metadata: {
                planType,
                templeUserId: templeUser.id,
                templeId: templeUser.templeId,
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (err) {
        console.error('[billing/checkout]', err);
        return NextResponse.json({ error: '決済セッションの作成に失敗しました。' }, { status: 500 });
    }
}
