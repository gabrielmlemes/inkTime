'use server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

import { canCreateService } from './can-create-service';
import { PlanDetailInfo } from './get-plans';

type PLAN_PROP = 'BASIC' | 'PROFESSIONAL' | 'TRIAL' | 'EXPIRED';

interface HasPermissionProps {
  type: string;
}

export interface ResultPermissionProps {
  hasPermission: boolean;
  planId: PLAN_PROP;
  expired: boolean;
  plan: PlanDetailInfo | null;
}

export async function hasPermission({ type }: HasPermissionProps): Promise<ResultPermissionProps> {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      hasPermission: false,
      planId: 'EXPIRED',
      expired: true,
      plan: null,
    };
  }

  const subscription = await prisma.subscription.findFirst({
    where: {
      userId: session.user.id,
    },
  });

  switch (type) {
    // Verifica quantos serviços o user pode criar com base no plano dele (BASIC | PROFESSIONAL | TRIAL | EXPIRED)
    case 'service':
      const permission = await canCreateService(subscription, session);
      return permission;

    default:
      return {
        hasPermission: false,
        planId: 'EXPIRED',
        expired: true,
        plan: null,
      };
  }
}
