import { redirect } from 'next/navigation';

import getServerSession from '@/lib/get-server-session';

import { getUserInfo } from './_data-access/get-user-info';

const Profile = async () => {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  const user = await getUserInfo({ userId: session?.user?.id });

  if (!user) {
    redirect('/login');
  }

  return <div>Profile Page</div>;
};

export default Profile;
