import { Toaster } from '@/components/ui/toaster';
import { QueryClientContext } from '@/providers/query-client';

import Sidebar from './_components/sidebar';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Sidebar>
        <QueryClientContext>
          <Toaster />
          {children}
        </QueryClientContext>
      </Sidebar>
    </>
  );
};

export default DashboardLayout;
