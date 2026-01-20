'use server';

import { addDays, isAfter } from 'date-fns';
import { Session } from 'next-auth';

import { TRIAL_DAYS } from '@/constants/trial-limit-days';

import { ResultPermissionProps } from './has-permission';

export async function checkSubscriptionExpired(session: Session): Promise<ResultPermissionProps> {
  // 1. Verifica se existe uma assinatura ativa
  if (session.user.subscription?.status === 'active') {
    return {
      hasPermission: true,
      planId: session.user.subscription.plan,
      expired: false,
      plan: session.user.subscription,
    };
  }

  // 2. Se não houver assinatura ativa, verifica o período de trial
  const trialEndDate = addDays(new Date(session.user.createdAt), TRIAL_DAYS);

  if (isAfter(new Date(), trialEndDate)) {
    return {
      hasPermission: false,
      planId: 'EXPIRED',
      expired: true,
      plan: null,
    };
  }

  // 3. Se não expirou, o usuário está em trial
  return {
    hasPermission: true,
    planId: 'TRIAL',
    expired: false,
    plan: null,
  };
}
