import Image from 'next/image';
import Link from 'next/link';

import { SheetButton } from './sheet-button';

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-20 p-6">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-3xl">
          <div className="flex items-center space-x-2 text-slate-100">
            Ink<span className="text-primary">Time</span>
            <Image src="/tattoo-svgrepo-com.svg" alt="Logo InkTime" width={30} height={30} />
          </div>
        </Link>

        <nav className="hidden md:flex">
          <Link href="#">Profissionais</Link>
        </nav>

        <SheetButton />
      </div>
    </header>
  );
};

export default Header;
