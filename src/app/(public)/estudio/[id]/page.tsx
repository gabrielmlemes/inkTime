import { redirect } from 'next/navigation';

import { getInfoSchedule } from './_data-access/get-info-schedule';

export default async function SchedulePage({ params }: { params: Promise<{ id: string }> }) {
  const estudioId = (await params).id;

  const user = await getInfoSchedule({ userId: estudioId });

  if (!user) {
    redirect('/');
  }
  console.log(user);

  return <p>página {estudioId}</p>;
}
