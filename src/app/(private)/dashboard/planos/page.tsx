import { Loader2Icon } from 'lucide-react';
import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import getServerSession from '@/lib/get-server-session';

import getSubscription from '../../_stripe-data-access/get-subscription';
import { PlansGrid } from './_components/plans-grid';
import { SubscriptionDetail } from './_components/subscription-details';

export const metadata: Metadata = {
  title: 'Dashboard | Planos',
  description: 'Gerencie seus planos.',
};

export default async function Plans() {
  const session = await getServerSession();

  if (!session) {
    redirect('/login');
  }

  const subscription = await getSubscription({
    userId: session.user.id,
  });
  console.log(subscription);

  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <Loader2Icon className="animate-spin h-10 w-10" />
        </div>
      }
    >
      {subscription?.status !== 'active' && <PlansGrid />}

      {subscription?.status === 'active' && <SubscriptionDetail subscription={subscription!} />}
    </Suspense>
  );
}
