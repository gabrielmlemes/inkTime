import Image from 'next/image';

import TattooArtist from '@/assets/hero/tatuador.png';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="mt-20">
      <div className="container mx-auto px-6 md:px-8 pb-5 md:pb-0 min-h-[calc(100vh-5rem)] flex items-end justify-center">
        <main className="flex items-center justify-center flex-col-reverse md:flex-row md:space-x-20">
          <article className="flex-1 flex flex-col space-y-5 mt-2 md:mt-0 max-w-lg text-center md:text-left">
            <h1 className="font-bold text-2xl md:text-3xl"> Transforme sua pele em arte!</h1>
            <p className=" text-sm text-gray-400 md:text-base">
              Descubra tatuadores talentosos, estilos exclusivos e uma experiência única do início
              ao fim. Agende sua sessão e eternize sua história com a gente!
            </p>

            <Button
              variant="outline"
              size="sm"
              className="border-amber-200 cursor-pointer bg-accent text-muted font-semibold hover:scale-105 transition-all
               duration-400 ease-in-out"
            >
              Agende sua sessão
            </Button>
          </article>

          <div className="w-2/4 max-w-xs pb-2 md:max-w-sm md:pb-0 flex-1">
            <Image src={TattooArtist} alt="Imagem de um tatuador" />
          </div>
        </main>
      </div>
    </section>
  );
};

export default Hero;
