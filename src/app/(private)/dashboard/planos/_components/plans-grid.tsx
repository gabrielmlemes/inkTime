'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { subscriptionPlans } from '@/utils/plans';

import { SubscriptionButton } from './subscription-button';

export function PlansGrid() {
  return (
    <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
      {subscriptionPlans.map((plan, index) => (
        <Card
          key={plan.id}
          className="flex flex-col w-full mx-auto last:border-emerald-500 last:pt-0"
        >
          {index === 1 && (
            <div className="bg-emerald-500 w-full py-3 text-center text-white font-semibold rounded-t-xl">
              <p className="text-xl font-semibold">Promoção exclusiva</p>
            </div>
          )}

          <CardHeader>
            <CardTitle className="text-3xl font-semibold">{plan.name}</CardTitle>
            <CardDescription className="text-lg text-gray-500">{plan.description}</CardDescription>
          </CardHeader>

          <CardContent>
            <ul>
              {plan.features.map((feature, index) => (
                <li key={index} className="md:text-lg">
                  • {feature}
                </li>
              ))}
            </ul>

            <div className="mt-4">
              <p className="text-xl font-semibold text-gray-700 line-through">{plan.oldPrice}</p>
              <p className="text-2xl lg:text-3xl font-bold ">{plan.price}</p>
            </div>
          </CardContent>

          <CardFooter className="mt-auto">
            <SubscriptionButton type={plan.id === 'BASIC' ? 'BASIC' : 'PROFESSIONAL'} />
          </CardFooter>
        </Card>
      ))}
    </article>
  );
}
