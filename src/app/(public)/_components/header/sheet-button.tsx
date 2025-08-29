import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';

export function SheetButton() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden" asChild>
        <Button
          className="cursor-pointer hover:scale-105 transition-all duration-200"
          variant="outline"
          size="icon"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Um pouco mais sobre nosso serviço</SheetTitle>
          <SheetDescription>
            <nav>
              <Link href="#">Profissionais</Link>
            </nav>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
