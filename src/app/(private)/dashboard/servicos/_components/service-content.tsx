import { redirect } from 'next/navigation';

import { SubscriptionLabel } from '@/components/ui/subscription-label';
import { TrialLabel } from '@/components/ui/trial-label';
import getServerSession from '@/lib/get-server-session';
import { checkSubscription } from '@/permissions/check-subscription';
import { hasPermission } from '@/permissions/has-permission';

import { getServices } from '../_data-access/get-services';
import { ServicesList } from './services-list';

interface ServiceContentProps {
  userId: string;
}

export async function ServiceContent({ userId }: ServiceContentProps) {
  const session = await getServerSession();

  if (!session) {
    throw new Error('Unauthorized');
  }

  const services = await getServices({ userId });
  const permissions = await hasPermission({ type: 'service' });
  const subscription = await checkSubscription({ userId: session.user.id });
  // console.log('permissões: ', permissions);

  return (
    <>
      {permissions.planId === 'TRIAL' && <TrialLabel subscription={subscription} />}

      {!permissions.hasPermission && <SubscriptionLabel expired={permissions.expired} />}

      {permissions.planId !== 'EXPIRED' && (
        <ServicesList services={services || []} permissions={permissions} />
      )}
    </>
  );
}
