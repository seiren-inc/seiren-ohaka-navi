import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

// Stripe からの Raw body が必要なため bodyParser を無効化
export const config = {
    api: { bodyParser: false },
};

export async function POST(req: NextRequest) {
    const body = await req.text();
    const sig = req.headers.get('stripe-signature');

    if (!sig) {
        return NextResponse.json({ error: 'Signature missing' }, { status: 400 });
    }

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err) {
        console.error('[webhook] signature verification failed', err);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;
                const templeId = session.metadata?.templeId;
                if (templeId) {
                    await prisma.temple.update({
                        where: { id: templeId },
                        data: { planType: 'standard' },
                    });
                    console.log(`[webhook] planType updated to standard: templeId=${templeId}`);
                }
                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription;
                const customerId = subscription.customer as string;
                // customerId から templeUser を特定して planType を free に戻す
                const templeUser = await prisma.templeUser.findFirst({
                    where: { stripeCustomerId: customerId },
                });
                if (templeUser) {
                    await prisma.temple.update({
                        where: { id: templeUser.templeId },
                        data: { planType: 'free' },
                    });
                    console.log(`[webhook] planType reverted to free: templeId=${templeUser.templeId}`);
                }
                break;
            }

            default:
                // 未処理のイベントは無視
                break;
        }
    } catch (err) {
        console.error('[webhook] DB update error', err);
        return NextResponse.json({ error: 'DB update failed' }, { status: 500 });
    }

    return NextResponse.json({ received: true });
}
