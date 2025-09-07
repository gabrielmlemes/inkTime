import MobileSidebar from './_components/mobile-sidebar';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <MobileSidebar>{children}</MobileSidebar>
    </>
  );
};

export default DashboardLayout;
