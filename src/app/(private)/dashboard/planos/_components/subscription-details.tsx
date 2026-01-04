'use client';
import { CheckCircleIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { subscriptionPlans } from '@/utils/plans';

import { Subscription } from '../../../../../../generated/prisma';
import { createCustomerPortal } from '../_actions/create-customer-portal';

interface SubscriptionDetailProps {
  subscription: Subscription;
}

export function SubscriptionDetail({ subscription }: SubscriptionDetailProps) {
  const subscriptionPlansInfo = subscriptionPlans.find((plan) => plan.id === subscription.plan);

  async function handleManageSubscription() {
    const portal = await createCustomerPortal();

    if (portal.error) {
      toast.error('Erro ao criar portal de assinatura.');
      return;
    }

    window.location.href = portal.sessionId;
  }

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl font-semibold">Plano atual</CardTitle>
        <CardDescription className="flex items-center gap-2">
          Seu plano está ativo
          <CheckCircleIcon className="size-3 text-muted-foreground" />
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="flex items-center justify-between">
          <h3 className="text-xl lg:text-2xl font-semibold">{subscription.plan}</h3>

          <span className="flex items-center gap-1 text-xs lg:text-base border border-green-500 py-1 px-2 rounded-md font-semibold text-green-500">
            Ativo <CheckCircleIcon className="text-green-500 size-3 md:size-4" />
          </span>
        </div>

        <ul className="mt-2 text-sm lg:text-base space-y-2">
          {subscriptionPlansInfo &&
            subscriptionPlansInfo.features.map((feature, index) => (
              <li key={index}>• {feature}</li>
            ))}
        </ul>
      </CardContent>

      <CardFooter className="mt-auto">
        <Button className="w-full" variant="outline" onClick={handleManageSubscription}>
          Gerenciar plano
        </Button>
      </CardFooter>
    </Card>
  );
}
