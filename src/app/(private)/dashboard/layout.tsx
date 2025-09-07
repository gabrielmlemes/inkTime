import Sidebar from './_components/sidebar';

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Sidebar>{children}</Sidebar>
    </>
  );
};

export default DashboardLayout;
