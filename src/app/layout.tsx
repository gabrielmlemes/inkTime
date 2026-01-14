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
  title: 'Inkore',
  description: 'A sua plataforma de agendamentos online.',
  icons: {
    icon: '/favicon.svg',
  },
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
