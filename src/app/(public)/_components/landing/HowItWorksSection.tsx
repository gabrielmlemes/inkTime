import { ArrowRight } from 'lucide-react';

const steps = [
  {
    step: '01',
    name: 'Crie sua conta',
    description: 'Cadastre-se rapidamente usando sua conta do Google. Sem formulários longos.',
  },
  {
    step: '02',
    name: 'Configure seu estúdio',
    description:
      'Adicione seus serviços, preços e horários de funcionamento em um painel fácil de usar.',
  },
  {
    step: '03',
    name: 'Receba Agendamentos',
    description:
      'Divulgue seu link exclusivo e comece a receber agendamentos online dos seus clientes.',
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl lg:text-center">
          <p className="font-semibold leading-7 text-primary">Comece em minutos</p>
          <h2 className="mt-2 text-4xl sm:text-5xl font-medium tracking-tight text-foreground">
            Tudo pronto para decolar em 3 passos
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Começar a usar o Inktime é um processo rápido, simples e intuitivo.
          </p>
        </div>
        <div className="relative mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div
            className="absolute inset-0 hidden lg:block"
            aria-hidden="true"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%2327272a' stroke-width='3' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
              maskImage:
                'linear-gradient(to right, transparent, white 10%, white 90%, transparent)',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: '80% 2px',
              top: '-60%',
            }}
          />

          <dl className="grid grid-cols-1 gap-y-16 text-center lg:grid-cols-3 lg:gap-x-8">
            {steps.map((step) => (
              <div key={step.name} className="relative flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-2xl font-bold text-primary ring-2 ring-border">
                  {step.step.charAt(1)}
                </div>
                <h3 className="mt-6 text-xl font-semibold text-foreground">{step.name}</h3>
                <p className="mt-2 text-base text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};
