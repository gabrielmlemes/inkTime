import { Plan } from '../../generated/prisma';
import { getPlans } from './get-plans'; // Assuming getPlans is in the same directory as the test

describe('getPlans', () => {
  it('should return the correct details for the BASIC plan', async () => {
    const planId: Plan = 'BASIC';
    const result = await getPlans(planId);

    expect(result).toEqual({ maxServices: 3 });
  });

  it('should return the correct details for the PROFESSIONAL plan', async () => {
    const planId: Plan = 'PROFESSIONAL';
    const result = await getPlans(planId);

    expect(result).toEqual({ maxServices: 50 });
  });

  // Since Plan is a Prisma enum, theoretically only valid plans should be passed.
  // However, if an invalid planId could somehow be passed, the function would return undefined.
  // This test checks that behavior if such a scenario were to occur.
  it('should return undefined for an invalid planId', async () => {
    // Casting to Plan to satisfy TypeScript, though in runtime it would be an invalid string
    const planId = 'INVALID_PLAN' as Plan;
    const result = await getPlans(planId);

    expect(result).toBeUndefined();
  });
});
