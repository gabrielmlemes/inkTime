import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import ScheduleContent from './_components/schedule-content';
import { getStudioInfo } from './_data-access/get-estudio-info';

export const metadata: Metadata = {
  title: 'Agendamento - Inkore',
  description: 'Agendamento facilitado para você!',
};

export default async function SchedulePage({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  const user = await getStudioInfo({ slug: slug });

  if (!user) {
    redirect('/');
  }

  return <ScheduleContent user={user} />;
}
