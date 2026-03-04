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

        const templeUser = await prisma.templeUser.findUnique({ where: { email } });
        if (!templeUser?.stripeCustomerId) {
            return NextResponse.json({ error: 'Stripe 顧客情報が見つかりません。' }, { status: 404 });
        }

        const portalSession = await stripe.billingPortal.sessions.create({
            customer: templeUser.stripeCustomerId,
            return_url: `${BASE_URL}/portal/dashboard`,
        });

        return NextResponse.json({ url: portalSession.url });
    } catch (err) {
        console.error('[billing/portal]', err);
        return NextResponse.json({ error: '請求管理画面の取得に失敗しました。' }, { status: 500 });
    }
}
