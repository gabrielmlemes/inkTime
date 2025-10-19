import { Toaster } from '@/components/ui/toaster';

import Sidebar from './_components/sidebar';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Sidebar>{children}</Sidebar>
      <Toaster />
    </>
  );
};

export default DashboardLayout;
