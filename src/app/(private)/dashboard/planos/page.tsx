import { Loader2Icon } from 'lucide-react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import getServerSession from '@/lib/get-server-session';

import { PlansGrid } from './_components/plans-grid';

export const metadata: Metadata = {
  title: 'Dashboard | Planos',
  description: 'Gerencie seus planos.',
};

export default async function Plans() {
  const session = await getServerSession();

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
      <PlansGrid />
    </Suspense>
  );
}
