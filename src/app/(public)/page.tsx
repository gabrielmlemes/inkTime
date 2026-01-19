import { Metadata } from 'next';

import Footer from '@/components/footer';

import Header from './_components/header/header';
import { FAQSection } from './_components/landing/FAQSection';
import { FeaturesSection } from './_components/landing/FeaturesSection';
import { FinalCTASection } from './_components/landing/FinalCTASection';
import { HeroParallaxSection } from './_components/landing/HeroParallax';
import { HowItWorksSection } from './_components/landing/HowItWorksSection';
import { PricingSection } from './_components/landing/PricingSection';

export const metadata: Metadata = {
  title: 'Inkore - A plataforma completa para seu estúdio de tatuagem',
  description: 'Agendamentos inteligentes para estúdios de tatuagem',
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main>
        <HeroParallaxSection />
        {/* <SocialProofSection /> */}
        <div id="recursos">
          <FeaturesSection />
        </div>
        <HowItWorksSection />
        <div id="precos">
          <PricingSection />
        </div>
        <div id="faq">
          <FAQSection />
        </div>
        <FinalCTASection />
      </main>

      <Footer />
    </div>
  );
}
