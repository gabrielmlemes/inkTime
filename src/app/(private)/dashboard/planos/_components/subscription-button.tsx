'use client';

import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { getStripeJs } from '@/utils/stripe-js';

import { Plan } from '../../../../../../generated/prisma';
import { createSubscription } from '../_actions/create-subscription';

interface SubscriptionButtonProps {
  type: Plan;
}

export function SubscriptionButton({ type }: SubscriptionButtonProps) {
  async function handleCreateBilling() {
    const { sessionId, error, url } = await createSubscription({ type });

    if (error) {
      toast.error(error);
      return;
    }

    const stripe = await getStripeJs();

    if (stripe && url) {
      window.location.href = url;
    }
  }

  return (
    <Button
      variant="outline"
      className={cn(
        'w-full font-bold',
        type === 'BASIC' && 'bg-indigo-500 hover:bg-indigo-4',
        type === 'PROFESSIONAL' && 'bg-emerald-500 hover:bg-emerald-4'
      )}
      onClick={handleCreateBilling}
    >
      Ativar assinatura
    </Button>
  );
}
