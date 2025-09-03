import { ArrowRight, Circle } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { tattooArtists } from '@/constants/tattoo-artists';

const Professionals = () => {
  return (
    <section className="bg-background py-12 sm:py-16 lg:py-20">
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
            <div
              key={artist.id}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-muted shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
            >
              <div className="overflow-hidden">
                <Image
                  src={artist.image}
                  alt={`Foto de ${artist.name}, tatuador(a) especialista em ${artist.style}`}
                  width={400}
                  height={400}
                  className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground">{artist.name}</h3>
                  <div
                    className="flex flex-shrink-0 items-center"
                    title="Disponível para agendamento"
                  >
                    <span className="sr-only">Disponível</span>
                    <Circle className="h-3 w-3 text-secondary fill-secondary" />
                  </div>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{artist.style}</p>

                <div className="flex-1" />

                <Button
                  variant="default"
                  size="sm"
                  className="mt-4 w-full"
                  aria-label={`Agendar sessão com ${artist.name}`}
                >
                  Agendar Sessão
                  <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Professionals;
