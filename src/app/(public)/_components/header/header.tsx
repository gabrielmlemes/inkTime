import Image from 'next/image';
import Link from 'next/link';

import TattooIcon from '@/assets/tattoo-svgrepo-com.svg';

import { SheetButton } from './mobile-header';
import { UserInfo } from './user-info';

const Header = () => {
  const session = null; // adicionar lógica da sessão aqui

  return (
    <header className="fixed top-0 w-full z-20 p-6 backdrop-blur-sm bg-background/75">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-3xl">
          <div className="flex items-center space-x-2 text-slate-100">
            Ink<span className="text-primary">Time</span>
            <Image src={TattooIcon} alt="Logo InkTime" width={30} height={30} />
          </div>
        </Link>

        <UserInfo session={session} className="hidden md:flex" />

        {/* Mobile */}
        <SheetButton session={session} />
      </div>
    </header>
  );
};

export default Header;
