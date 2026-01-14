import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import DashboardImage from '@/assets/hero/dashboardExample.jpg';
import { Button } from '@/components/ui/button';

export const FinalCTASection = () => {
  return (
    <section className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-secondary px-6 py-24 text-center shadow-2xl rounded-3xl border border-border/50">
          <div className="relative z-10">
            <h2 className="mx-auto max-w-2xl text-4xl sm:text-5xl font-medium text-foreground">
              Sua arte merece uma agenda profissional
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted-foreground">
              Comece seu teste gratuito de 7 dias. Sem compromisso, cancele quando quiser.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button
                size="lg"
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Link href="/login">
                  Criar minha agenda agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          <Image
            src={DashboardImage}
            alt="Imagem do dashboard da plataforma Inkore ao fundo"
            fill
            className="absolute inset-0 -z-10 h-full w-full object-cover opacity-[0.03] transform-gpu scale-125 -rotate-6"
          />
          <div className="absolute inset-0 -z-10 bg-secondary/80" />
        </div>
      </div>
    </section>
  );
};
