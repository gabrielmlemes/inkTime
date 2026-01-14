import { AppWindow, Bell, CalendarDays, LayoutGrid, Sparkles, Users } from 'lucide-react';

const features = [
  {
    name: 'Sua Vitrine 100% Online',
    description:
      'Receba agendamentos 24/7 com uma página profissional, totalmente integrada à sua agenda.',
    icon: AppWindow,
  },
  {
    name: 'Agenda Inteligente e Unificada',
    description:
      'Gerencie todos os seus compromissos em um só lugar, evitando conflitos de horários e dores de cabeça.',
    icon: CalendarDays,
  },
  {
    name: 'Gestão Simplificada do Perfil',
    description:
      'Atualize seus serviços, preços e horários de funcionamento em um painel simples e sincronize tudo em tempo real.',
    icon: LayoutGrid,
  },
  {
    name: 'Lembretes Internos',
    description:
      'Crie lembretes personalizados para não esquecer detalhes importantes de cada cliente e mantenha tudo sob controle.',
    icon: Bell,
  },
];

export const FeaturesSection = () => {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:text-center">
          <p className="font-semibold leading-7 text-primary">Tudo que você precisa</p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-medium tracking-tight text-foreground">
            Uma plataforma feita para o seu estúdio crescer
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Concentre-se na sua arte. Deixe que o Inkore cuide da organização e dos agendamentos
            para você.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-foreground">
                  <div className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                    <feature.icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-muted-foreground">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};
