import prisma from '@/lib/prisma';
import { stripe } from '@/utils/stripe';

import { Plan } from '../../../../generated/prisma';

/**
 * Salvar, atualizar ou deletar informações das assinaturas (subscription) no banco de dados, sincronizando com a Stripe.
 *
 * @async
 * @function manageSubscription
 * @param {string} subscriptionId - O ID da assinatura a ser gerenciada.
 * @param {string} customerId - O ID do cliente associado à assinatura.
 * @param {boolean} createAction - Indica se uma nova assinatura deve ser criada.
 * @param {boolean} deleteAction - Indica se uma assinatura deve ser deletada.
 * @param {Plan} [type] - O tipo de plano associado à assinatura.
 * @returns {Promise<Response|void>}
 */
export async function manageSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false,
  deleteAction = false,
  type?: Plan
) {
  if (!subscriptionId || !customerId) {
    return;
  }

  try {
    const user = await prisma.user.findFirst({
      where: {
        stripe_customer_id: customerId,
      },
    });

    if (!user) {
      return Response.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);

    const subscriptionData = {
      id: subscription.id,
      status: subscription.status,
      plan: type ?? 'BASIC',
      priceId: subscription.items.data[0].price.id,
      userId: user.id,
    };

    if (subscriptionId && deleteAction) {
      await prisma.subscription.delete({
        where: {
          id: subscriptionId,
        },
      });

      return;
    }

    if (createAction) {
      try {
        await prisma.subscription.create({
          data: subscriptionData,
        });
      } catch (error) {
        console.error('Error creating subscription:', error);
        return;
      }

      return;
    }

    try {
      const findSubscription = await prisma.subscription.findFirst({
        where: {
          id: subscriptionId,
        },
      });

      if (!findSubscription) {
        return;
      }

      await prisma.subscription.update({
        where: {
          id: subscriptionId,
        },
        data: {
          status: subscription.status,
          priceId: subscription.items.data[0].price.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.error('Error managing subscription:', error);
    return;
  }
}
