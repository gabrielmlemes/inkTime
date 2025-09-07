import Logo from '@/components/logo';

import { SheetButton } from './mobile-header';
import { UserInfo } from './user-info';

const Header = () => {
  const session = null; // adicionar lógica da sessão aqui

  return (
    <header className="fixed top-0 w-full z-20 p-6 backdrop-blur-sm bg-background/75">
      <div className="container mx-auto flex items-center justify-between">
        <Logo href="/" />
        <UserInfo session={session} className="hidden md:flex" />

        {/* Mobile */}
        <SheetButton session={session} />
      </div>
    </header>
  );
};

export default Header;
