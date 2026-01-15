'use client';

import { Loader2Icon } from 'lucide-react';
import { signIn } from 'next-auth/react';
import { useTransition } from 'react';

import { Button } from '@/components/ui/button';
import { GoogleIcon } from '@/components/ui/google-icon';

export function SignInForm() {
  const [isPending, startTransition] = useTransition();

  const handleOAuthSignIn = (provider: 'google') => {
    startTransition(async () => {
      await signIn(provider, {
        callbackUrl: '/dashboard',
      });
    });
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="text-center mb-8 space-y-3">
        <h1 className="text-2xl font-bold text-secondary">Acesse sua conta</h1>
        <p className="text-gray-500">Use sua conta do Google para acessar a plataforma Inkore</p>
      </div>

      <Button
        variant="outline"
        className="w-full h-12 text-base"
        onClick={() => handleOAuthSignIn('google')}
        disabled={isPending}
      >
        {isPending ? <Loader2Icon className="animate-spin" /> : <GoogleIcon />}
        <span className="ml-2">Entrar com Google</span>
      </Button>
    </div>
  );
}
