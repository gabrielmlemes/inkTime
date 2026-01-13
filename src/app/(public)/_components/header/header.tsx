import { LogInIcon } from 'lucide-react';
import Link from 'next/link';

import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';

import { MobileHeader } from './mobile-header';

const Header = () => {
  return (
    <header className="fixed top-2 w-full z-20 p-6 backdrop-blur-sm bg-background/75">
      <div className="container mx-auto flex items-center justify-between">
        <Logo href="/" />

        <Button asChild>
          <Link href="/login">
            <span className="flex items-center gap-2">
              Acessar plataforma
              <LogInIcon />
            </span>
          </Link>
        </Button>

        {/* Mobile */}
        <MobileHeader />
      </div>
    </header>
  );
};

export default Header;
