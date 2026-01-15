'use client'; // Ensure this is at the top if not already present

import { motion } from 'framer-motion'; // Import motion
import { Check } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const plans = [
  {
    name: 'BASIC',
    price: 'R$ 27,90',
    pricePeriod: '/mês',
    description: 'Para estúdios que estão começando e precisam do essencial.',
    features: [
      'Página de agendamento online',
      'Agenda unificada',
      'Lembretes de agendamento',
      'Até 3 serviços cadastrados',
    ],
    isRecommended: false,
    cta: 'Começar com o BASIC',
    href: '/login',
  },
  {
    name: 'PROFESSIONAL',
    price: 'R$ 59,90',
    pricePeriod: '/mês',
    description: 'Para estúdios que buscam crescimento e máximo controle.',
    features: [
      'Página de agendamento online',
      'Agenda unificada',
      'Lembretes de agendamento',
      'Serviços ilimitados',
      'Suporte prioritário',
      'Gestão de múltiplos tatuadores (em breve)',
    ],
    isRecommended: true,
    cta: 'Teste o PROFESSIONAL',
    href: '/login',
  },
];

export const PricingSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger children animations
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <section className="bg-secondary/10 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-semibold leading-7 text-primary">Preços</p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-medium tracking-tight text-foreground">
            Um plano para cada fase do seu estúdio
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Preços transparentes e um plano para cada etapa do seu crescimento. Sem surpresas.
          </p>
        </div>
        <motion.div
          className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              className={cn(
                'relative rounded-3xl p-8 ring-1 ring-border xl:p-10',
                plan.isRecommended
                  ? 'bg-background ring-2 ring-primary shadow-xl shadow-gray-800'
                  : 'bg-background/50'
              )}
              variants={itemVariants}
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
              <Button
                asChild
                className="w-full mt-6"
                size="lg"
                variant={plan.isRecommended ? 'default' : 'outline'}
              >
                <Link href={plan.href}>{plan.cta}</Link>
              </Button>
              <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-muted-foreground">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <Check className="h-6 w-5 flex-none text-primary" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
