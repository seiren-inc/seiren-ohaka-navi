import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';
import { stripe } from '@/lib/stripe';

export const dynamic = 'force-dynamic';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://seiren-ohaka-navi.vercel.app';

export async function POST(_req: NextRequest) {
    try {
        const cookieStore = await cookies();
        const email = cookieStore.get('portal_session')?.value;
        if (!email) {
            return NextResponse.json({ error: '未ログインです。' }, { status: 401 });
        }

        const templeUser = await prisma.templeUser.findUnique({
            where: { email },
            include: { temple: true },
        });
        if (!templeUser) {
            return NextResponse.json({ error: 'ユーザーが見つかりません。' }, { status: 404 });
        }

        // すでに standard 以上のプランであればスキップ
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
            line_items: [
                {
                    price: process.env.STRIPE_STANDARD_PRICE_ID!,
                    quantity: 1,
                },
            ],
            success_url: `${BASE_URL}/portal/dashboard?payment=success`,
            cancel_url: `${BASE_URL}/portal/dashboard?payment=cancel`,
            metadata: {
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
