export const SocialProofSection = () => {
  const logos = ['Blackwork Inc.', 'Golden Needle', 'Arte na Pele', 'Ink & Co.', 'New School Arts'];

  return (
    <section className="bg-background py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-sm font-bold tracking-widest uppercase text-muted">
            Aprovado pelos melhores estúdios
          </h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {logos.map((logo) => (
            <div
              key={logo}
              className="col-span-1 flex justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <p className="text-lg font-medium">{logo}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
