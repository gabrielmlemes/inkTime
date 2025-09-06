import { ArrowRight, Circle } from 'lucide-react';
import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';

import { Button } from './ui/button';

interface CardProps {
  artist: {
    name: string;
    style: string;
    image: StaticImageData;
  };
}

const Card = ({ artist }: CardProps) => {
  return (
    <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-muted shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/20">
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
          <div className="flex flex-shrink-0 items-center" title="Disponível para agendamento">
            <span className="sr-only">Disponível</span>
            <Circle className="h-3 w-3 text-secondary fill-secondary" />
          </div>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">{artist.style}</p>

        <div className="flex-1" />

        <Button
          variant="default"
          asChild
          size="sm"
          className="mt-4 w-full transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer"
          aria-label={`Agendar sessão com ${artist.name}`}
        >
          {/* href = /studio/123 */}
          <Link href="#">
            Agendar Sessão
            <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Card;
