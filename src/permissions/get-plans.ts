'use server';
import { Plan } from '../../generated/prisma';
import { PlansProps } from './../utils/plans/index';

export interface PlanDetailInfo {
  maxServices: number;
}

const PLANS_LIMITS: PlansProps = {
  BASIC: {
    maxServices: 3,
  },
  PROFESSIONAL: {
    maxServices: 50,
  },
};
export async function getPlans(planId: Plan) {
  return PLANS_LIMITS[planId];
}
