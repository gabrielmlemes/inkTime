import { redirect } from 'next/navigation';

import ScheduleContent from './_components/schedule-content';
import { getStudioInfo } from './_data-access/get-estudio-info';

export default async function SchedulePage({ params }: { params: Promise<{ id: string }> }) {
  const estudioId = (await params).id;

  const user = await getStudioInfo({ userId: estudioId });

  if (!user) {
    redirect('/');
  }

  return <ScheduleContent user={user} />;
}
