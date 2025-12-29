import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Meu perfil',
  description: 'Gerencie as informações do seu perfil.',
};

import { Loader2Icon } from 'lucide-react';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

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

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2Icon className="animate-spin h-10 w-10" />
        </div>
      }
    >
      <ProfileForm user={user} />
    </Suspense>
  );
};

export default Profile;
