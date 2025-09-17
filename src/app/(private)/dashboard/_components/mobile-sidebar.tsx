import { Banknote, CalendarCheck2, Folder, List, Settings } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import SidebarLink from './sidebar-links';

interface MobileDashboardSidebarProps {
  pathname: string;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function MobileDashboardSidebar({
  pathname,
  isCollapsed,
  setIsCollapsed,
}: MobileDashboardSidebarProps) {
  return (
    <header className="md:hidden flex items-center justify-between border-b border-gray-800 px-4 md:px-6 h-14 z-10 sticky top-0 backdrop-blur-sm bg-background/75">
      <Sheet>
        <div className="flex items-center gap-4">
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden cursor-pointer"
              onClick={() => setIsCollapsed(false)}
            >
              <List className="size-6" />
            </Button>
          </SheetTrigger>

          <h1 className="text-base md:text-lg font-semibold">Menu</h1>
        </div>

        <SheetContent side="left" className="text-white px-6 md:hidden">
          <SheetHeader className="px-0">
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          <nav className="grid gap-2 text-base ">
            <span className="text-muted-foreground text-xs mt-4">PAINEL</span>

            <SidebarLink
              href="/dashboard"
              label="Agendamentos"
              icon={<CalendarCheck2 className="w-6 h-6" />}
              pathname={pathname}
              isCollapsed={isCollapsed}
            />

            <SidebarLink
              href="/dashboard/services"
              label="Serviços"
              icon={<Folder className="w-6 h-6" />}
              pathname={pathname}
              isCollapsed={isCollapsed}
            />

            <span className="text-muted-foreground text-xs mt-4">CONFIGURAÇÕES</span>

            <SidebarLink
              href="/dashboard/profile"
              label="Meu perfil"
              icon={<Settings className="w-6 h-6" />}
              pathname={pathname}
              isCollapsed={isCollapsed}
            />

            <SidebarLink
              href="/dashboard/plans"
              label="Planos"
              icon={<Banknote className="w-6 h-6" />}
              pathname={pathname}
              isCollapsed={isCollapsed}
            />
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
