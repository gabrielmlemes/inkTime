import { AppWindow, Bell, CalendarDays, Clock, LayoutGrid, Sparkles } from 'lucide-react';

const features = [
  {
    name: 'Página de Agendamento Exclusiva',
    description:
      'Receba agendamentos 24/7 com uma página profissional, totalmente integrada à sua agenda.',
    icon: AppWindow,
  },
  {
    name: 'Agenda Inteligente',
    description:
      'Visualize e gerencie todos os seus compromissos em um calendário unificado, evitando conflitos de horários.',
    icon: CalendarDays,
  },
  {
    name: 'Gestão Simplificada do Perfil',
    description:
      'Atualize seus serviços, preços e horários de funcionamento em um painel simples e sincronize tudo em tempo real.',
    icon: LayoutGrid,
  },
  // {
  //   name: 'Lembretes Automáticos',
  //   description:
  //     'Diminua as faltas de clientes (no-shows) com lembretes automáticos enviados por e-mail, garantindo sua agenda cheia.',
  //   icon: Bell,
  // },
  {
    name: 'Lembretes Internos',
    description:
      'Crie lembretes personalizados para não esquecer detalhes importantes de cada cliente e manter tudo sob controle.',
    icon: Bell,
  },
  {
    name: 'Horários de Funcionamento',
    description:
      'Configure seus horários de trabalho e dias de folga facilmente. O sistema bloqueará automaticamente os horários indisponíveis.',
    icon: Clock,
  },
  {
    name: 'Design Profissional',
    description:
      'Apresente uma imagem profissional e moderna para seus clientes, com um design que valoriza a identidade do seu estúdio.',
    icon: Sparkles,
  },
];

export const FeaturesSection = () => {
  return (
    <section className="bg-muted/30 py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="text-base font-semibold leading-7 text-primary">Tudo que você precisa</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Uma plataforma feita para o seu estúdio crescer
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Concentre-se na sua arte. O Inkore cuida da organização e dos agendamentos para você.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-foreground">
                  <feature.icon
                    className="h-8 w-8 flex-none text-primary bg-primary/10 p-1.5 rounded-lg"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-muted-foreground">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};
