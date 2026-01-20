import { Session } from 'next-auth';

import prisma from '@/lib/prisma';
import { PLANS } from '@/utils/plans';

import { Subscription } from '../../generated/prisma/client';
import { canCreateService } from './can-create-service';
import { checkSubscriptionExpired } from './check-subscription-expired';
import { getPlans } from './get-plans';

// Mock dependencies
jest.mock('@/lib/prisma', () => ({
  services: {
    count: jest.fn(),
  },
}));
jest.mock('./get-plans');
jest.mock('./check-subscription-expired');

const prismaCountMock = prisma.services.count as jest.Mock;
const getPlansMock = getPlans as jest.Mock;
const checkSubscriptionExpiredMock = checkSubscriptionExpired as jest.Mock;

describe('canCreateService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockSession: Session = {
    user: {
      id: 'test-user-id',
      name: '',
      email: '',
      times: [],
      status: false,
      createdAt: '',
      updatedAt: '',
      slug: undefined,
      subscription: undefined,
    },
    expires: 'some-date',
  };

  it('should return true for active subscription with unlimited services', async () => {
    const mockSubscription: Subscription = {
      id: 'sub1',
      userId: 'test-user-id',
      status: 'active',
      plan: 'PROFESSIONAL',
      createdAt: new Date(),
      updatedAt: new Date(),
      priceId: 'price-id',
    };
    prismaCountMock.mockResolvedValue(5); // Arbitrary count
    getPlansMock.mockResolvedValue({ maxServices: null }); // Unlimited

    const result = await canCreateService(mockSubscription, mockSession);

    expect(result).toEqual({
      hasPermission: true,
      planId: 'PROFESSIONAL',
      expired: false,
      plan: PLANS.PROFESSIONAL,
    });
    expect(prismaCountMock).toHaveBeenCalledWith({
      where: {
        userId: 'test-user-id',
        isActive: true,
      },
    });
    expect(getPlansMock).toHaveBeenCalledWith('PROFESSIONAL');
    expect(checkSubscriptionExpiredMock).not.toHaveBeenCalled();
  });

  it('should return true for active subscription under service limit', async () => {
    const mockSubscription: Subscription = {
      id: 'sub2',
      userId: 'test-user-id',
      status: 'active',
      plan: 'BASIC',
      createdAt: new Date(),
      updatedAt: new Date(),
      priceId: 'price-id',
    };
    prismaCountMock.mockResolvedValue(2);
    getPlansMock.mockResolvedValue({ maxServices: 5 });

    const result = await canCreateService(mockSubscription, mockSession);

    expect(result).toEqual({
      hasPermission: true,
      planId: 'BASIC',
      expired: false,
      plan: PLANS.BASIC,
    });
    expect(prismaCountMock).toHaveBeenCalledTimes(1);
    expect(getPlansMock).toHaveBeenCalledWith('BASIC');
    expect(checkSubscriptionExpiredMock).not.toHaveBeenCalled();
  });

  it('should return false for active subscription at service limit', async () => {
    const mockSubscription: Subscription = {
      id: 'sub3',
      userId: 'test-user-id',
      status: 'active',
      plan: 'BASIC',
      createdAt: new Date(),
      updatedAt: new Date(),
      priceId: 'price-id',
    };
    prismaCountMock.mockResolvedValue(5);
    getPlansMock.mockResolvedValue({ maxServices: 5 });

    const result = await canCreateService(mockSubscription, mockSession);

    expect(result).toEqual({
      hasPermission: false,
      planId: 'BASIC',
      expired: false,
      plan: PLANS.BASIC,
    });
    expect(prismaCountMock).toHaveBeenCalledTimes(1);
    expect(getPlansMock).toHaveBeenCalledWith('BASIC');
    expect(checkSubscriptionExpiredMock).not.toHaveBeenCalled();
  });

  it('should return false for active subscription over service limit', async () => {
    const mockSubscription: Subscription = {
      id: 'sub4',
      userId: 'test-user-id',
      status: 'active',
      plan: 'BASIC',
      createdAt: new Date(),
      updatedAt: new Date(),
      priceId: 'price-id',
    };
    prismaCountMock.mockResolvedValue(6);
    getPlansMock.mockResolvedValue({ maxServices: 5 });

    const result = await canCreateService(mockSubscription, mockSession);

    expect(result).toEqual({
      hasPermission: false,
      planId: 'BASIC',
      expired: false,
      plan: PLANS.BASIC,
    });
    expect(prismaCountMock).toHaveBeenCalledTimes(1);
    expect(getPlansMock).toHaveBeenCalledWith('BASIC');
    expect(checkSubscriptionExpiredMock).not.toHaveBeenCalled();
  });

  it('should delegate to checkSubscriptionExpired if no active subscription (TRIAL)', async () => {
    prismaCountMock.mockResolvedValue(0); // Service count doesn't matter here
    checkSubscriptionExpiredMock.mockResolvedValue({
      subscriptionStatus: 'TRIAL',
      message: 'You are in trial',
      expired: false,
    });

    const result = await canCreateService(null, mockSession);

    expect(result).toEqual({
      subscriptionStatus: 'TRIAL',
      message: 'You are in trial',
      expired: false,
    });
    expect(prismaCountMock).toHaveBeenCalledTimes(1);
    expect(getPlansMock).not.toHaveBeenCalled();
    expect(checkSubscriptionExpiredMock).toHaveBeenCalledWith(mockSession);
  });

  it('should delegate to checkSubscriptionExpired if no active subscription (EXPIRED)', async () => {
    prismaCountMock.mockResolvedValue(0);
    checkSubscriptionExpiredMock.mockResolvedValue({
      subscriptionStatus: 'EXPIRED',
      message: 'Your trial has expired',
      expired: true,
    });

    const result = await canCreateService(null, mockSession);

    expect(result).toEqual({
      subscriptionStatus: 'EXPIRED',
      message: 'Your trial has expired',
      expired: true,
    });
    expect(prismaCountMock).toHaveBeenCalledTimes(1);
    expect(getPlansMock).not.toHaveBeenCalled();
    expect(checkSubscriptionExpiredMock).toHaveBeenCalledWith(mockSession);
  });

  it('should return an error object if an error occurs', async () => {
    prismaCountMock.mockRejectedValue(new Error('Database error')); // Simulate an error

    const result = await canCreateService(null, mockSession); // Subscription null to hit the catch

    expect(result).toEqual({
      hasPermission: false,
      planId: 'EXPIRED',
      expired: false,
      plan: null,
    });
    expect(prismaCountMock).toHaveBeenCalledTimes(1);
    // expect(console.log).toHaveBeenCalledWith(new Error('Database error')); // If console.log was mocked
  });
});
