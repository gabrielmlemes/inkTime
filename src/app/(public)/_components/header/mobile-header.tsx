'use client';

import { Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { landingNavItems } from '@/constants/landing-nav-items';

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-full h-full flex flex-col max-w-xs z-50">
        <div className=" my-6 flex justify-center">
          <Logo href="/" />
        </div>

        <nav className="flex flex-col gap-2 items-center">
          {landingNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="py-2 font-medium text-shadow-lg text-lg text-muted-foreground hover:bg-muted hover:underline"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="border-t border-gray-800 mt-auto px-4 py-4">
          <Button asChild className="w-full">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
