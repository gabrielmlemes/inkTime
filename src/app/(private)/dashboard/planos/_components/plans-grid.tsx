'use client';
import { Check } from 'lucide-react';

import { plans } from '@/app/(public)/_components/landing/PricingSection';
import { cn } from '@/lib/utils';

import { SubscriptionButton } from './subscription-button';

export function PlansGrid() {
  return (
    <section>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'relative rounded-3xl p-8 ring-1 ring-border xl:p-10',
                plan.isRecommended
                  ? 'bg-background ring-2 ring-primary shadow-xl shadow-gray-800'
                  : 'bg-background/50'
              )}
            >
              {plan.isRecommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 transform ">
                  <div className="rounded-full bg-primary px-4 py-1 text-sm font-semibold text-primary-foreground">
                    Mais Popular
                  </div>
                </div>
              )}
              <h3 className="text-lg font-semibold uppercase tracking-wider leading-8 text-foreground">
                {plan.name}
              </h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{plan.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-foreground">
                  {plan.price}
                </span>
                <span className="text-sm font-semibold leading-6 text-muted-foreground">
                  {plan.pricePeriod}
                </span>
              </p>

              <div className="mt-6">
                <SubscriptionButton type={plan.isRecommended ? 'PROFESSIONAL' : 'BASIC'} />
              </div>

              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
