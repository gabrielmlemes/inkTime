'use client';

import clsx from 'clsx';
import {
  Banknote,
  CalendarCheck2,
  ChevronLeft,
  ChevronRight,
  Folder,
  Settings,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { useState } from 'react';

import Logo from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent } from '@/components/ui/collapsible';
import { Divider } from '@/components/ui/divider';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import MobileDashboardSidebar from './mobile-sidebar';
import SidebarLink from './sidebar-links';
import { UserInfo } from './user-info';

const Sidebar = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const { data: session, status, update } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setisCollapsed] = useState(false); // jogar pro zustand

  async function handleSignOut() {
    await signOut();
    await update();
    router.replace('/login');
  }

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

        {/* Open/Close sidebar button */}
        <Button
          size="icon"
          variant="default"
          className={clsx('mt-6 cursor-pointer flex items-center justify-center ml-auto', {
            'ml-0 mx-auto': isCollapsed,
          })}
          onClick={() => setisCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight className="size-6" /> : <ChevronLeft className="size-6" />}
        </Button>

        {/* Desktop Sidebar closed */}
        {isCollapsed && (
          <nav className="mt-6 flex flex-col gap-4">
            <Tooltip>
              <TooltipTrigger>
                <SidebarLink
                  href="/dashboard"
                  label="Agendamentos"
                  icon={<CalendarCheck2 className="w-6 h-6 text-muted-foreground" />}
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                />
              </TooltipTrigger>
              <TooltipContent side="right">Agendamentos</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <SidebarLink
                  href="/dashboard/services"
                  label="Serviços"
                  icon={<Folder className="w-6 h-6 text-muted-foreground" />}
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                />
              </TooltipTrigger>
              <TooltipContent side="right">Serviços</TooltipContent>
            </Tooltip>

            <Divider />

            <Tooltip>
              <TooltipTrigger>
                <SidebarLink
                  href="/dashboard/profile"
                  label="Meu perfil"
                  icon={<Settings className="w-6 h-6 text-muted-foreground" />}
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                />
              </TooltipTrigger>
              <TooltipContent side="right">Perfil</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger>
                <SidebarLink
                  href="/dashboard/plans"
                  label="Planos"
                  icon={<Banknote className="w-6 h-6 text-muted-foreground" />}
                  pathname={pathname}
                  isCollapsed={isCollapsed}
                />
              </TooltipTrigger>
              <TooltipContent side="right">Planos</TooltipContent>
            </Tooltip>
          </nav>
        )}

        {/* Desktop Sidebar open */}
        <Collapsible open={!isCollapsed} className="mt-6 flex-grow">
          <CollapsibleContent className="flex h-full flex-col">
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

            <div className="mt-auto flex flex-col gap-4 items-center">
              <Divider />
              <UserInfo session={session} status={status} />
              <Button onClick={handleSignOut} className="w-full">
                Sair
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </aside>

      {/* Mobile Sidebar */}
      <div className="flex flex-1 flex-col transition-all duration-300">
        <MobileDashboardSidebar
          pathname={pathname}
          isCollapsed={isCollapsed}
          setIsCollapsed={setisCollapsed}
          session={session}
        />

        <main className="flex-1 py-4 px-4 md:px-6">{children}</main>
      </div>
    </section>
  );
};

export default Sidebar;
