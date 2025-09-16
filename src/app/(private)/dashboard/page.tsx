import { redirect } from 'next/navigation';

import getServerSession from '@/lib/get-server-session';

const Dashboard = async () => {
  const session = await getServerSession();

  if (!session) {
    return redirect('/login');
  }

  return <div>Dashboard Page</div>;
};

export default Dashboard;
