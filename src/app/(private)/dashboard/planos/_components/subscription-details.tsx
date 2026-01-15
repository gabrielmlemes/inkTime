'use client';
import { Check, CheckCircleIcon } from 'lucide-react'; // Import Check icon
import { toast } from 'sonner';

import { plans } from '@/app/(public)/_components/landing/PricingSection';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils'; // Import cn

import { Subscription } from '../../../../../../generated/prisma';
import { createCustomerPortal } from '../_actions/create-customer-portal';

interface SubscriptionDetailProps {
  subscription: Subscription;
}

export function SubscriptionDetail({ subscription }: SubscriptionDetailProps) {
  const subscriptionPlansInfo = plans.find((plan) => plan.name === subscription.plan);

  async function handleManageSubscription() {
    const portal = await createCustomerPortal();

    if (portal.error) {
      toast.error('Erro ao criar portal de assinatura.');
      return;
    }

    window.location.href = portal.sessionId;
  }

  const isProfessionalPlan = subscription.plan === 'PROFESSIONAL';

  return (
    <Card
      className={cn(
        'relative rounded-3xl p-8 ring-1 ring-border xl:p-10 w-full mx-auto',
        isProfessionalPlan
          ? 'bg-background ring-2 ring-primary shadow-xl shadow-gray-800'
          : 'bg-background/50'
      )}
    >
      <CardHeader className="p-0">
        <CardTitle className="text-2xl font-semibold uppercase tracking-wider leading-8 text-foreground">
          {subscription.plan}
        </CardTitle>
        <CardDescription className="mt-4 text-md leading-6 text-muted-foreground">
          Seu plano atual.
        </CardDescription>
        <div className="flex items-center gap-1 mt-2 text-sm lg:text-base border border-green-500 py-1 px-2 rounded-md font-semibold text-green-500 w-fit">
          Ativo <CheckCircleIcon className="text-green-500 size-3 md:size-4" />
        </div>
      </CardHeader>

      <CardContent className="p-0 mt-6">
        {subscriptionPlansInfo && (
          <p className="flex items-baseline gap-x-1">
            <span className="text-4xl font-bold tracking-tight text-foreground">
              {subscriptionPlansInfo.price}
            </span>
            <span className="text-sm font-semibold leading-6 text-muted-foreground">
              {subscriptionPlansInfo.pricePeriod}
            </span>
          </p>
        )}
        <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
          {subscriptionPlansInfo &&
            subscriptionPlansInfo.features.map((feature) => (
              <li key={feature} className="flex gap-x-3">
                <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                {feature}
              </li>
            ))}
        </ul>
      </CardContent>

      <CardFooter className="p-0 mt-6 flex flex-col items-start">
        <Button className="w-full" variant="outline" onClick={handleManageSubscription}>
          Gerenciar plano
        </Button>
      </CardFooter>
    </Card>
  );
}
