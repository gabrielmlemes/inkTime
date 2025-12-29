'use client';

import Link from 'next/link';
import { Link as ScrollLink } from 'react-scroll';

import { Button } from '@/components/ui/button';

import { User } from '../../../../../generated/prisma';

interface HeroButtonsProps {
  studio?: User | null;
}

export function HeroButtons({ studio }: HeroButtonsProps) {
  return (
    <div className="flex flex-col gap-4 justify-start items-center md:flex-row">
      <Button
        asChild
        className="transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer w-full md:w-auto"
        size="lg"
      >
        <Link target="_blank" href={`/estudio/${studio?.id}`}>
          Agendar Sessão
        </Link>
      </Button>

      <ScrollLink to="professionals" smooth={true} duration={500} className="w-full">
        <Button
          size="lg"
          variant="outline"
          className="transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer w-full md:w-auto"
          aria-label="Ver artistas"
        >
          Ver Artistas
        </Button>
      </ScrollLink>
    </div>
  );
}
