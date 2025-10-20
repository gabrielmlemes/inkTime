import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Meu perfil - Dashboard',
  description: 'Gerencie as informações do seu perfil.',
};

import { redirect } from 'next/navigation';

import getServerSession from '@/lib/get-server-session';

import ProfileForm from './_components/profile-form';
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

  return <ProfileForm user={user} />;
};

export default Profile;
