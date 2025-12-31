export type PlansDetailsProps = {
  maxServices: number;
};

export type PlansProps = {
  BASIC: PlansDetailsProps;
  PROFESSIONAL: PlansDetailsProps;
};

export const PLANS = {
  BASIC: {
    maxServices: 3,
  },
  PROFESSIONAL: {
    maxServices: 50,
  },
};

export const subscriptionPlans = [
  {
    id: 'BASIC',
    name: 'Basic',
    description: 'Perfeito para estúdios menores',
    oldPrice: 'R$ 97,90',
    price: 'R$ 27,90',
    features: [`Até ${PLANS.BASIC.maxServices} serviços`, 'Agendamentos ilimitados', 'Suporte'],
  },
  {
    id: 'PROFESSIONAL',
    name: 'Professional',
    description: 'Ideal para estúdios grandes',
    oldPrice: 'R$ 297,90',
    price: 'R$ 97,90',
    features: [
      `Até ${PLANS.PROFESSIONAL.maxServices} serviços`,
      'Agendamentos ilimitados',
      'Suporte prioritário',
      'Relatórios',
    ],
  },
];
