import Link from 'next/link';

import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { landingNavItems } from '@/constants/landing-nav-items';

import { MobileHeader } from './mobile-header';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-background/80 border-b border-gray-800">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Logo href="/" />

        <nav className="hidden md:flex items-center gap-6">
          {landingNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <MobileHeader />
        </div>
      </div>
    </header>
  );
};

export default Header;
