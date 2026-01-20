import { subDays } from 'date-fns';

import { TRIAL_DAYS } from '@/constants/trial-limit-days';
import prisma from '@/lib/prisma';

import { checkSubscription } from './check-subscription';

// Mock do Prisma
jest.mock('@/lib/prisma', () => ({
  user: {
    findFirst: jest.fn(),
  },
}));

// Mock da data atual para garantir consistência nos testes
const mockDate = new Date('2024-01-10T10:00:00Z');
jest.useFakeTimers().setSystemTime(mockDate);

const prismaMock = prisma.user.findFirst as jest.Mock;

describe('checkSubscription', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should throw an error if user is not found', async () => {
    prismaMock.mockResolvedValue(null);
    await expect(checkSubscription({ userId: 'invalid-user-id' })).rejects.toThrow(
      'Usuário não encontrado'
    );
  });

  it('should return "active" status for a user with an active subscription', async () => {
    const userWithSubscription = {
      id: 'user-with-active-sub',
      createdAt: new Date(),
      subscription: {
        status: 'active',
        plan: 'PROFESSIONAL',
      },
    };
    prismaMock.mockResolvedValue(userWithSubscription);

    const result = await checkSubscription({ userId: 'user-with-active-sub' });

    expect(result).toEqual({
      subscriptionStatus: 'active',
      message: 'Assinatura ativa',
      planId: 'PROFESSIONAL',
    });
  });

  it('should return "EXPIRED" status for a user whose trial period has ended', async () => {
    // Usuário criado há mais dias do que o período de trial
    const userWithExpiredTrial = {
      id: 'user-expired',
      createdAt: subDays(mockDate, TRIAL_DAYS + 5), // Criado 12 dias atrás (7 + 5)
      subscription: null,
    };
    prismaMock.mockResolvedValue(userWithExpiredTrial);

    const result = await checkSubscription({ userId: 'user-expired' });

    expect(result).toEqual({
      subscriptionStatus: 'EXPIRED',
      message: 'Seu período de teste expirou',
    });
  });

  it('should return "TRIAL" status for a user within the trial period', async () => {
    // Usuário criado há 2 dias
    const userInTrial = {
      id: 'user-in-trial',
      createdAt: subDays(mockDate, 2),
      subscription: null,
    };
    prismaMock.mockResolvedValue(userInTrial);

    const result = await checkSubscription({ userId: 'user-in-trial' });
    const remainingDays = TRIAL_DAYS - 2;

    expect(result).toEqual({
      subscriptionStatus: 'TRIAL',
      message: `Você está no período de teste gratuito. ${remainingDays} dias restantes!`,
      planId: 'TRIAL',
    });
  });

  it('should return the correct message for 1 day remaining in trial', async () => {
    // Usuário criado há 6 dias (restando 1 dia de trial)
    const userAlmostExpired = {
      id: 'user-almost-expired',
      createdAt: subDays(mockDate, TRIAL_DAYS - 1),
      subscription: null,
    };
    prismaMock.mockResolvedValue(userAlmostExpired);

    const result = await checkSubscription({ userId: 'user-almost-expired' });

    expect(result).toEqual({
      subscriptionStatus: 'TRIAL',
      message: 'Você está no período de teste gratuito. 1 dia restante!',
      planId: 'TRIAL',
    });
  });

  it('should return the correct message for the last day of trial', async () => {
    // Usuário criado há 7 dias (último dia do trial)
    const userLastDay = {
      id: 'user-last-day',
      createdAt: subDays(mockDate, TRIAL_DAYS),
      subscription: null,
    };
    prismaMock.mockResolvedValue(userLastDay);

    const result = await checkSubscription({ userId: 'user-last-day' });

    expect(result).toEqual({
      subscriptionStatus: 'TRIAL',
      message: 'Você está no período de teste gratuito. Último dia de teste!',
      planId: 'TRIAL',
    });
  });
});
