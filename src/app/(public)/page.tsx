import Header from './_components/header/header';
import Hero from './_components/hero/hero';
import Professionals from './_components/hero/professionals';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <Hero />

      <Professionals />
    </div>
  );
}
