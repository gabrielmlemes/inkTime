import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | Serviços',
  description: 'Gerencie seus serviços.',
};

import { Loader2Icon } from 'lucide-react';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import auth from '@/lib/get-server-session';

import { ServiceContent } from './_components/service-content';

export default async function Service() {
  const session = await auth();

  if (!session) {
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
      <ServiceContent userId={session?.user?.id} />
    </Suspense>
  );
}
