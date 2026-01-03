'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { stripe } from '@/utils/stripe';

export async function createCustomerPortal() {
  const session = await auth();
  if (!session) {
    return {
      sessionId: '',
      error: 'Falha ao encontrar o usuário.',
    };
  }

  const user = await prisma.user.findFirst({
    where: {
      id: session?.user?.id,
    },
  });

  if (!user) {
    return {
      sessionId: '',
      error: 'Falha ao encontrar o usuário.',
    };
  }

  const stripeCustomerId = user.stripe_customer_id;

  if (!stripeCustomerId) {
    return {
      sessionId: '',
      error: 'Falha ao encontrar o usuário.',
    };
  }

  try {
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: stripeCustomerId,
      return_url: process.env.STRIPE_SUCCESS_URL as string,
    });

    return {
      sessionId: portalSession.url,
    };
  } catch (error) {
    console.log(error);

    return {
      sessionId: '',
      error: 'Falha ao criar portal',
    };
  }
}
