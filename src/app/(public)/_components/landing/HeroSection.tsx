import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import DashboardImage from '@/assets/hero/dashboardExample.jpg';
import { Button } from '@/components/ui/button';

export const HeroSection = () => {
  return (
    <section className="relative bg-background w-full pt-32 pb-20 md:pt-48 md:pb-32 flex items-center justify-center text-center">
      <div className="container z-10 mx-auto px-4">
        <h2 className="text-5xl md:text-7xl font-medium text-foreground mb-6">
          Menos burocracia, mais tempo para sua arte.
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto mb-10">
          A plataforma completa para estúdios de tatuagem. Gerencie sua agenda, clientes e horários
          em um só lugar, de forma simples e profissional.
        </p>
        <div className="flex justify-center gap-4">
          <Button
            size="lg"
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <Link href="/login">
              Comece seu teste gratuito
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Visual Mockup Placeholder */}
        <div className="relative mt-16 md:mt-24 max-w-5xl mx-auto">
          <div className="aspect-auto w-full bg-secondary/30 rounded-xl border border-border/50 shadow-lg shadow-gray-800 flex items-center justify-center">
            <Image
              alt="Imagem de exemplo do dashboard do Inkore"
              src={DashboardImage}
              className="w-full h-full object-contain rounded-xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};
