import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import DashboardImage from '@/assets/hero/dashboardExample.jpg';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  return (
    <section className="relative bg-background w-full pt-32 pb-20 md:pt-48 md:pb-32 flex items-center justify-center text-center">
      <div className="container z-10 mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-4">
          A plataforma completa para gestão do seu estúdio de tatuagem
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Menos burocracia, mais tempo para tatuar. Gerencie agendamentos e clientes com facilidade.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/login">
              Comece seu teste gratuito
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Visual Mockup Placeholder */}
        <div className="relative mt-16 md:mt-24 max-w-5xl mx-auto">
          <div className="aspect-auto w-full bg-muted rounded-xl border-2 border-border/50 shadow-lg flex items-center justify-center">
            <Image
              alt="Imagem de exemplo do dashboard do Inkore"
              src={DashboardImage}
              className="w-full h-full object-contain rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
