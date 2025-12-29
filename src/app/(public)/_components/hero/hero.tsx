import Image from 'next/image';

import TattooArtist from '@/assets/hero/tatuador.png';

import { getStudio } from '../../_actions/getStudio';
import { HeroButtons } from './hero-buttons';

const Hero = async () => {
  const studio = await getStudio();

  return (
    <section className="mt-20">
      <div className="container mx-auto px-6 md:px-8 pb-5 md:pb-0 min-h-[calc(100vh-5rem)] flex items-end justify-center">
        <main className="flex items-center justify-center flex-col-reverse md:flex-row md:space-x-20">
          <article className="flex-1 flex flex-col space-y-5 mt-2 md:mt-0 max-w-lg text-center md:text-left">
            <h1 className="text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Transforme sua pele em arte!
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Encontre os melhores artistas, explore estilos únicos e agende sua sessão de forma
              simples e segura.
            </p>

            <HeroButtons studio={studio} />
          </article>

          <div className="w-2/4 max-w-xs pb-2 md:max-w-sm md:pb-0 flex-1">
            <Image src={TattooArtist} alt="Imagem de um tatuador" quality={100} priority />
          </div>
        </main>
      </div>
    </section>
  );
};

export default Hero;
