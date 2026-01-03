'use server';

import { Session } from 'next-auth';

import prisma from '@/lib/prisma';
import { PLANS } from '@/utils/plans';

import { Subscription } from '../../generated/prisma/client';
import { checkSubscriptionExpired } from './check-subscription-expired';
import { getPlans } from './get-plans';
import { ResultPermissionProps } from './has-permission';

export async function canCreateService(
  subscription: Subscription | null,
  session: Session
): Promise<ResultPermissionProps> {
  try {
    // Quantidade de serviços que o cliente já tem cadastrado no banco.
    const serviceCount = await prisma.services.count({
      where: {
        userId: session?.user?.id,
      },
    });

    // Se o usuário já tem uma assinatura ativa
    if (subscription && subscription.status === 'active') {
      const plan = subscription.plan; // 'BASIC' | 'PROFESSIONAL'
      const planLimits = await getPlans(plan); // Limite do plano

      console.log('Limites do seu plano: ', planLimits);

      return {
        hasPermission: planLimits.maxServices === null || serviceCount <= planLimits.maxServices, // Verifica se a quantidade de serviços que o cliente já tem cadastrado é menor que a quantidade máxima (maxServices) que o plano atual dele suporta. Se for, hasPermission será true!
        planId: plan, // É o ID do plano ativo do cliente = 'BASIC' OU 'PROFESSIONAL'
        expired: false,
        plan: PLANS[plan],
      };
    }

    // Se passou do if, é porque ainda está no período TRIAL (teste)
    const checkUserLimit = await checkSubscriptionExpired(session); // Busca se o usuário ainda está no período de teste ou se já expirou

    return checkUserLimit;
  } catch (error) {
    console.log(error);

    return {
      hasPermission: false,
      planId: 'EXPIRED',
      expired: false,
      plan: null,
    };
  }
}
