import Header from './_components/header/header';
import Hero from './_components/hero/hero';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <Hero />
    </div>
  );
}
