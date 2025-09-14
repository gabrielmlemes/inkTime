'use client';

import { Menu } from 'lucide-react';
import { useState } from 'react';

import NavLinks from '@/components/nav-links';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { navItems } from '@/constants/navItems';

export function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger className="md:hidden" asChild>
        <Button
          className="cursor-pointer text-muted-foreground hover:scale-105 transition-all duration-200"
          variant="outline"
          size="icon"
        >
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-64 z-50">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <Button variant="ghost" asChild onClick={() => setIsOpen(false)}>
          <NavLinks items={navItems} className="flex flex-col space-y-2" />
        </Button>
      </SheetContent>
    </Sheet>
  );
}
