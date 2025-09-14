import Logo from '@/components/logo';

import { MobileHeader } from './mobile-header';

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-20 p-6 backdrop-blur-sm bg-background/75">
      <div className="container mx-auto flex items-center justify-start">
        <Logo href="/" />

        {/* Mobile */}
        <MobileHeader />
      </div>
    </header>
  );
};

export default Header;
