import { NextResponse } from 'next/server';
import Stripe from 'stripe';

import { stripe } from '@/utils/stripe';

export const POST = async (request: Request) => {
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.error();
  }

  console.log('webhook iniciando...');

  const text = await request.text();

  const event = stripe.webhooks.constructEvent(
    text,
    signature,
    process.env.STRIPE_SECRET_WEBHOOK_KEY as string
  );

  switch (event.type) {
    case 'customer.subscription.deleted':
      const payment = event.data.object as Stripe.Subscription;
      console.log('Assinatura cancelada: ', payment);

      // Se o evento do cliente (usuário) foi de subscription.deleted, vai no banco e delete a assinatura desse cliente (usuário)
      break;
    case 'customer.subscription.updated':
      const paymentIntent = event.data.object as Stripe.Subscription;
      console.log('Assinatura atualizada: ', paymentIntent);

      // Ir no banco e atualizar a assinatura do cliente (usuário)
      break;
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('Checkout concluído: ', session);

      // Ir no banco e criar uma assinatura ativa para este usuário
      break;

    default:
      console.log('Evento não tratado', event.type);
  }

  return NextResponse.json({ received: true });
};
