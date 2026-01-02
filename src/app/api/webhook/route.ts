import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { manageSubscription } from '@/app/(private)/_stripe-data-access/manage-subscription';
import { stripe } from '@/utils/stripe';

import { Plan } from '../../../../generated/prisma';

export const POST = async (request: Request) => {
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.error();
  }

  console.log(
    'webhook iniciando======================================================================'
  );

  const text = await request.text();

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_SECRET_WEBHOOK_KEY as string
  );

  switch (event.type) {
    case 'customer.subscription.deleted':
      const payment = event.data.object as Stripe.Subscription;

      // Se o evento do cliente (usuário) foi de subscription.deleted, vai no banco e delete a assinatura desse cliente (usuário)
      await manageSubscription(payment.id, payment.customer.toString(), false, true);

      break;
    case 'customer.subscription.updated':
      const paymentIntent = event.data.object as Stripe.Subscription;

      // Ir no banco e atualizar a assinatura do cliente (usuário)
      await manageSubscription(paymentIntent.id, paymentIntent.customer.toString(), false, false);

      break;
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      const type = session?.metadata?.type ? session?.metadata?.type : 'BASIC';

      // Ir no banco e criar uma assinatura ativa para este usuário
      if (session.subscription && session.customer) {
        await manageSubscription(
          session.subscription.toString(),
          session.customer.toString(),
          true,
          false,
          type as Plan
        );
      }

      break;

    default:
      console.log('Evento não tratado', event.type);
  }

  revalidatePath('/dashboard/planos');

  return NextResponse.json({ received: true });
};
