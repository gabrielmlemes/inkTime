'use server';

import { signIn } from '@/lib/auth';

export async function handleLogin(provider: string) {
  await signIn(provider, { redirectTo: '/dashboard' });
}
