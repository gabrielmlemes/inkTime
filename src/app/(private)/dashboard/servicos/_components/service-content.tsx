import { SubscriptionLabel } from '@/components/ui/subscription-label';
import { hasPermission } from '@/permissions/has-permission';

import { getServices } from '../_data-access/get-services';
import { ServicesList } from './services-list';

interface ServiceContentProps {
  userId: string;
}

export async function ServiceContent({ userId }: ServiceContentProps) {
  const services = await getServices({ userId });
  const permissions = await hasPermission({ type: 'service' });
  console.log('permissões: ', permissions);

  return (
    <>
      {permissions.planId === 'TRIAL' && (
        <div className="my-2">
          <h3 className="font-semibold text-lg text-muted-foreground">
            Você está no seu período de teste gratuito
          </h3>
        </div>
      )}

      {!permissions.hasPermission && <SubscriptionLabel expired={permissions.expired} />}

      <ServicesList services={services || []} permissions={permissions} />
    </>
  );
}
