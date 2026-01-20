'use server';

import { addDays, differenceInDays, isAfter } from 'date-fns';

import { TRIAL_DAYS } from '@/constants/trial-limit-days';
import prisma from '@/lib/prisma';

export interface CheckSubscriptionProps {
  subscriptionStatus: string;
  message: string;
  planId?: string;
}

export async function checkSubscription({ userId }: { userId: string }) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      subscription: true,
    },
  });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  if (user?.subscription && user?.subscription?.status === 'active') {
    return {
      subscriptionStatus: 'active',
      message: 'Assinatura ativa',
      planId: user?.subscription?.plan,
    };
  }

  const trialEndDate = addDays(user?.createdAt, TRIAL_DAYS); // Acrescenta 7 dias a partir da data de criação do usuário

  // Compara a data do dia de hoje com a data passada no segundo argumento (trialEndDate). E VERIFICA SE JÁ PASSOU!
  if (isAfter(new Date(), trialEndDate)) {
    return {
      subscriptionStatus: 'EXPIRED',
      message: 'Seu período de teste expirou',
    };
  }

  const remainingDays = differenceInDays(trialEndDate, new Date()); // Dias restantes -> Pega a data limite e a data atual e verifica quantos dias restam.

  // Define o texto correto dependendo da quantidade de dias
  let dayLabel = '';

  if (remainingDays === 0) {
    dayLabel = 'Último dia de teste'; // Caso seja 0, significa que é o último dia válido do trial
  }
  if (remainingDays === 1) {
    dayLabel = 'dia restante'; // Singular para 1 dia
  }
  if (remainingDays > 1) {
    dayLabel = 'dias restantes'; // Plural para 2 dias ou mais
  }

  return {
    subscriptionStatus: 'TRIAL',
    message: `Você está no período de teste gratuito. ${
      remainingDays > 0 ? `${remainingDays} ` : ''
    }${dayLabel}!`, // Renderiza a mensagem ajustada
    planId: 'TRIAL',
  };
}
