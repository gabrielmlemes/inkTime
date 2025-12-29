import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'InkTime',
  description: 'Seu estúdio favorito',
};

import Footer from '@/components/footer';

import Header from './_components/header/header';
import Hero from './_components/hero/hero';
import Professionals from './_components/hero/professionals';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <Hero />

      <div id="professionals">
        <Professionals />
      </div>

      <Footer />
    </div>
  );
}
