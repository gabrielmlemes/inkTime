import { Check, X } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: 'BASIC',
    price: 'R$ 27,90',
    pricePeriod: '/mês',
    description: 'Para estúdios que estão começando e precisam do essencial.',
    features: [
      'Página de agendamento online',
      'Agenda unificada',
      'Até 3 serviços cadastrados',
      'Lembretes de agendamento',
    ],
    isRecommended: false,
    cta: 'Começar com o BASIC',
    href: '/login',
  },
  {
    name: 'PROFESSIONAL',
    price: 'R$ 97,90',
    pricePeriod: '/mês',
    description: 'Para estúdios que buscam crescimento e máximo controle.',
    features: [
      'Tudo do plano BASIC, e mais:',
      'Serviços ilimitados',
      'Suporte prioritário',
      'Gestão de múltiplos tatuadores (em breve)',
      'Relatórios e análises (em breve)',
    ],
    isRecommended: true,
    cta: 'Teste o PROFESSIONAL',
    href: '/login',
  },
];

export const PricingSection = () => {
  return (
    <section className="bg-muted/30 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base font-semibold leading-7 text-primary">Preços</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Escolha o plano perfeito para o seu estúdio
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Comece de graça e evolua conforme seu negócio cresce. Sem burocracia.
          </p>
        </div>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'rounded-3xl p-8 ring-1 ring-border xl:p-10',
                plan.isRecommended ? 'bg-background ring-2 ring-primary' : 'bg-background/50'
              )}
            >
              <h3 className="text-lg font-semibold leading-8 text-foreground">{plan.name}</h3>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">{plan.description}</p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight text-foreground">
                  {plan.price}
                </span>
                <span className="text-sm font-semibold leading-6 text-muted-foreground">
                  {plan.pricePeriod}
                </span>
              </p>
              <Button
                asChild
                className="w-full mt-6"
                variant={plan.isRecommended ? 'default' : 'outline'}
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-green-500" aria-hidden="true" />
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
};
