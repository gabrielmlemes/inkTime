import { getServices } from '../_data-access/get-services';
import { ServicesList } from './services-list';

interface ServiceContentProps {
  userId: string;
}

export async function ServiceContent({ userId }: ServiceContentProps) {
  const services = await getServices({ userId });
  console.log(services);

  return <ServicesList />;
}
