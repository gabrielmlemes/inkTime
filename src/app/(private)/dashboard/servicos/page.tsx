import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Serviços',
  description: 'Gerencie seus serviços.',
};

import { redirect } from 'next/navigation';

import auth from '@/lib/get-server-session';

import { ServiceContent } from './_components/service-content';

export default async function Service() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return <ServiceContent userId={session?.user?.id} />;
}
