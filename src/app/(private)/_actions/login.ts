'use server';

import { signIn } from '@/lib/auth';

type Provider = 'github' | 'google' | 'email';

export async function handleLogin(provider: Provider) {
  await signIn(provider, { redirectTo: '/dashboard' });
}
