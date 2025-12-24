import { Banknote, CalendarCheck2, Folder, List, Settings } from 'lucide-react';
import { redirect } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

import SidebarLink from './sidebar-links';
import { UserInfo } from './user-info';

interface MobileDashboardSidebarProps {
  pathname: string;
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  session: any;
}

export default function MobileDashboardSidebar({
  pathname,
  isCollapsed,
  setIsCollapsed,
  session,
}: MobileDashboardSidebarProps) {
  const { update } = useSession();

  async function handleSignOut() {
    await signOut();
    await update();
    redirect('/login');
  }

  return (
    <div className="md:hidden flex items-center justify-between border-b border-gray-800 px-4 md:px-6 h-14 z-10 sticky top-0 backdrop-blur-sm bg-background/75">
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
              href="/dashboard/servicos"
              label="Serviços"
              icon={<Folder className="w-6 h-6" />}
              pathname={pathname}
              isCollapsed={isCollapsed}
            />

            <span className="text-muted-foreground text-xs mt-4">CONFIGURAÇÕES</span>

            <SidebarLink
              href="/dashboard/perfil"
              label="Meu perfil"
              icon={<Settings className="w-6 h-6" />}
              pathname={pathname}
              isCollapsed={isCollapsed}
            />

            <SidebarLink
              href="/dashboard/planos"
              label="Planos"
              icon={<Banknote className="w-6 h-6" />}
              pathname={pathname}
              isCollapsed={isCollapsed}
            />
          </nav>

          <div className="mt-auto flex flex-col gap-4 items-center mb-3">
            <Divider />
            <UserInfo session={session} />
            <Button onClick={handleSignOut} className="w-full">
              Sair
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
