import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import ScheduleContent from './_components/schedule-content';
import { getStudioInfo } from './_data-access/get-estudio-info';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const user = await getStudioInfo({ slug: slug });

  return {
    title: `${user?.name} | Agendamento online`,
    description: 'Faça seu agendamento',
    keywords: [
      'Inkore',
      'agendamento online',
      'gestão de agenda',
      'sistema de agendamento',
      'plataforma de reservas',
      'tatuagem',
      'tattoo',
      'estúdio de tatuagem',
      'beleza',
      'estética',
    ],
    icons: {
      icon: '/favicon.svg',
    },
    openGraph: {
      title: `${user?.name} | Agendamento online`,
      description: 'Faça seu agendamento',
      type: 'website',
      url: `https://www.inkorestudio.com.br/${user?.slug}`,
      siteName: 'Inkore',
      images: [
        {
          url: `https://www.inkorestudio.com.br/${user?.image}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${user?.name} | Agendamento online`,
      description: 'Faça seu agendamento',
      images: [`https://www.inkorestudio.com.br/${user?.image}`],
    },
    alternates: {
      canonical: `https://www.inkorestudio.com.br/${user?.slug}`,
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    metadataBase: new URL(`https://www.inkorestudio.com.br/${user?.slug}`),
  };
}

export default async function SchedulePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const user = await getStudioInfo({ slug: slug });

  if (!user) {
    redirect('/');
  }

  return <ScheduleContent user={user} />;
}
