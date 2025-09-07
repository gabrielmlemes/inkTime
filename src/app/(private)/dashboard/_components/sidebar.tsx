'use client';

import clsx from 'clsx';
import {
  Banknote,
  CalendarCheck2,
  ChevronLeft,
  ChevronRight,
  Folder,
  List,
  Settings,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import SidebarLink from './sidebar-links';

const Sidebar = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const pathname = usePathname();
  const [isCollapsed, setisCollapsed] = useState(false); // jogar pro zustand

  return (
    <section className="flex min-h-screen w-full">
      {/* Desktop sidebar */}
      <aside
        className={clsx(
          'flex flex-col border-r border-gray-800 transition-all duration-300 p-4 min-h-full overflow-hidden',
          {
            'w-20': isCollapsed,
            'w-64': !isCollapsed,
            'hidden md:flex md-fixed': true,
          }
        )}
      >
        <div className="mx-auto max-w-full">{!isCollapsed && <Logo href="/dashboard" />}</div>

        <Button
          size="icon"
          variant="default"
          className="mt-6 ml-auto cursor-pointer flex items-center justify-center"
          onClick={() => setisCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight className="size-6" /> : <ChevronLeft className="size-6" />}
        </Button>

        <Collapsible open={!isCollapsed} className="mt-6">
          <CollapsibleContent>
            <nav className="flex flex-col gap-4 text-sm">
              <span className="text-muted-foreground text-xs">Painel</span>

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
          </CollapsibleContent>
        </Collapsible>
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={clsx('flex flex-1 flex-col transition-all duration-300', {
          // 'md:ml-20': isCollapsed,
          // 'md:ml-64': !isCollapsed,
        })}
      >
        <header className="md:hidden flex items-center justify-between border-b border-gray-800 px-4 md:px-6 h-14 z-10 sticky top-0 backdrop-blur-sm bg-background/75">
          <Sheet>
            <div className="flex items-center gap-4">
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden cursor-pointer">
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

        <main className="flex-1 py-4 px-4 md:px-6">{children}</main>
      </div>
    </section>
  );
};

export default Sidebar;
