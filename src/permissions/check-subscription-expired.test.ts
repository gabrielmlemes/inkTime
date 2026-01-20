import { addDays, subDays } from 'date-fns';
import { Session } from 'next-auth';

import { Plan, Subscription } from '../../generated/prisma/client';
import { checkSubscriptionExpired } from './check-subscription-expired';

// Mock da constante TRIAL_DAYS para garantir que os testes não quebrem se o valor real mudar
jest.mock('@/constants/trial-limit-days', () => ({
  TRIAL_DAYS: 7,
}));

// Helper para criar um objeto de sessão mock
const createMockSession = (
  createdAt: Date,
  subscription: Partial<Subscription> | null
): Session => ({
  expires: addDays(new Date(), 30).toISOString(),
  user: {
    id: 'user-1',
    name: 'Test User',
    email: 'test@example.com',
    slug: 'test-user',
    createdAt: createdAt.toISOString(),
    subscription: subscription as Subscription | null,
    emailVerified: null,
    image: 'https://example.com/avatar.jpg',
    stripe_customer_id: 'customer-1',
    times: [],
    address: '',
    phone: '',
    status: true,
    timezone: null,
    updatedAt: new Date().toISOString(),
  },
});

describe('checkSubscriptionExpired', () => {
  it('should return hasPermission: true for a user with an active subscription', async () => {
    const today = new Date();
    const userCreatedAt = subDays(today, 30);
    const mockSubscription: Partial<Subscription> = {
      status: 'active',
      plan: 'PROFESSIONAL' as Plan,
    };
    const session = createMockSession(userCreatedAt, mockSubscription);

    const result = await checkSubscriptionExpired(session);

    expect(result.hasPermission).toBe(true);
    expect(result.planId).toBe('PROFESSIONAL');
    expect(result.expired).toBe(false);
  });

  it('should return hasPermission: true for a user within the trial period', async () => {
    const today = new Date();
    const userCreatedAt = subDays(today, 3);
    const session = createMockSession(userCreatedAt, null);

    const result = await checkSubscriptionExpired(session);

    expect(result.hasPermission).toBe(true);
    expect(result.planId).toBe('TRIAL');
    expect(result.expired).toBe(false);
  });

  it('should return hasPermission: false for a user with an expired trial', async () => {
    const today = new Date();
    const userCreatedAt = subDays(today, 10);
    const session = createMockSession(userCreatedAt, null);

    const result = await checkSubscriptionExpired(session);

    expect(result.hasPermission).toBe(false);
    expect(result.planId).toBe('EXPIRED');
    expect(result.expired).toBe(true);
  });

  it('should return hasPermission: false for a user with a non-active subscription', async () => {
    const today = new Date();
    const userCreatedAt = subDays(today, 20);
    const mockSubscription: Partial<Subscription> = {
      status: 'canceled',
      plan: 'BASIC' as Plan, // Usando string literal
    };
    const session = createMockSession(userCreatedAt, mockSubscription);

    const result = await checkSubscriptionExpired(session);

    expect(result.hasPermission).toBe(false);
    expect(result.planId).toBe('EXPIRED');
    expect(result.expired).toBe(true);
  });
});
