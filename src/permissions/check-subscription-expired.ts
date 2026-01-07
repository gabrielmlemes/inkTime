'use server';

import { addDays, isAfter } from 'date-fns';
import { Session } from 'next-auth';

import { TRIAL_DAYS } from '@/constants/trial-limit-days';

import { ResultPermissionProps } from './has-permission';

export async function checkSubscriptionExpired(session: Session): Promise<ResultPermissionProps> {
  const trialEndDate = addDays(session?.user?.createdAt, TRIAL_DAYS); // Acrescenta 7 dias a partir da data de criação do usuário

  // Compara a data do dia de hoje com a data passada no segundo argumento (trialEndDate). E VERIFICA SE JÁ PASSOU!
  if (isAfter(new Date(), trialEndDate)) {
    return {
      hasPermission: false,
      planId: 'EXPIRED',
      expired: true,
      plan: null,
    };
  }

  // Se passou do if, é porque a data de TRIAL ainda não passou, então o cliente ainda pode acessar tudo.
  return {
    hasPermission: true,
    planId: 'TRIAL',
    expired: false,
    plan: null,
  };
}
