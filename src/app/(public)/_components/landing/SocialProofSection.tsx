export const SocialProofSection = () => {
  return (
    <section className="bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-8 text-muted-foreground">
            A confiança de estúdios em todo o Brasil
          </h2>
        </div>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-2 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-3 lg:mx-0 lg:max-w-none lg:grid-cols-5">
          {/* Placeholder Logos */}
          <div className="flex justify-center items-center h-12 w-full bg-muted rounded-lg">
            <span className="text-sm text-muted-foreground">Studio Logo 1</span>
          </div>
          <div className="flex justify-center items-center h-12 w-full bg-muted rounded-lg">
            <span className="text-sm text-muted-foreground">Studio Logo 2</span>
          </div>
          <div className="flex justify-center items-center h-12 w-full bg-muted rounded-lg">
            <span className="text-sm text-muted-foreground">Studio Logo 3</span>
          </div>
          <div className="flex justify-center items-center h-12 w-full bg-muted rounded-lg">
            <span className="text-sm text-muted-foreground">Studio Logo 4</span>
          </div>
          <div className="flex justify-center items-center h-12 w-full bg-muted rounded-lg">
            <span className="text-sm text-muted-foreground">Studio Logo 5</span>
          </div>
        </div>
      </div>
    </section>
  );
};
