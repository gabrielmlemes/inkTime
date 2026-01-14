export const HowItWorksSection = () => {
  return (
    <section className="bg-background py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <p className="text-base font-semibold leading-7 text-primary">Comece em minutos</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Tudo pronto para decolar em 3 passos simples
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Começar a usar o Inkore é um processo rápido e intuitivo.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
            {/* Step 1 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                1
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">Crie sua conta</h3>
              <p className="mt-2 text-base text-muted-foreground">
                Cadastre-se rapidamente usando sua conta do Google. Sem formulários longos.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                2
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">Configure seu estúdio</h3>
              <p className="mt-2 text-base text-muted-foreground">
                Adicione seus serviços, preços e horários de funcionamento em um painel fácil de
                usar.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                3
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">Compartilhe e cresça</h3>
              <p className="mt-2 text-base text-muted-foreground">
                Divulgue seu link exclusivo e comece a receber agendamentos online dos seus
                clientes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
