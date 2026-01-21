import './globals.css';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Toaster } from 'sonner';

import { QueryClientContext } from '@/providers/query-client';
import SessionAuthProvider from '@/providers/session-auth';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Inkore - Plataforma de Agendamento Online',
  description:
    'Gestão inteligente de agendamentos para estúdios de tatuagem. Otimize sua rotina e foque na sua arte.',
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
    title: 'Inkore - Plataforma de Agendamento Online',
    description:
      'Gestão inteligente de agendamentos para estúdios de tatuagem. Otimize sua rotina e foque na sua arte.',
    type: 'website',
    url: 'https://www.inkorestudio.com.br',
    siteName: 'Inkore',
    images: [
      {
        url: 'https://www.inkorestudio.com.br/landingExample.jpg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Inkore',
    description:
      'Gestão inteligente de agendamentos para estúdios de tatuagem. Otimize sua rotina e foque na sua arte.',
    images: ['https://www.inkorestudio.com.br/landingExample.jpg'],
  },
  alternates: {
    canonical: 'https://www.inkorestudio.com.br',
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
  metadataBase: new URL('https://www.inkorestudio.com.br'),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SessionAuthProvider>
          <QueryClientContext>
            <Toaster />
            {children}
          </QueryClientContext>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
