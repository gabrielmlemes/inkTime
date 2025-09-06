import Card from '@/components/card.';
import { tattooArtists } from '@/constants/tattoo-artists';

const Professionals = () => {
  return (
    <section className="bg-background py-18 sm:py-20 lg:py-24" id="professionals">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Nossos Artistas
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Conheça os talentos que transformam ideias em arte na pele.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {tattooArtists.map((artist) => (
            <Card key={artist.name} artist={artist} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Professionals;
