import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import getServerSession from '@/lib/get-server-session';

import { SignInForm } from './_components/sign-in-form';

export const metadata: Metadata = {
  title: 'Inkore - Login',
  description: 'Faça seu login para acessar a plataforma.',
};

export default async function LoginPage() {
  const session = await getServerSession();

  if (session) {
    return redirect('/dashboard');
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-200">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <SignInForm />
      </div>
    </div>
  );
}
