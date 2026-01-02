'use server';

import z from 'zod';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

const getSubscriptionsSchema = z.object({
  userId: z.string().min(1, 'O usuário é obrigatório'),
});
export type GetSubscriptionsFormData = z.infer<typeof getSubscriptionsSchema>;

export default async function getSubscription({ userId }: { userId: string }) {
  const session = await auth();
  if (!session) {
    return;
  }

  const schema = getSubscriptionsSchema.safeParse({ userId });
  if (!schema.success) {
    return;
  }

  if (!userId) {
    return;
  }

  try {
    const response = await prisma.subscription.findFirst({
      where: {
        userId: userId,
      },
    });

    return response;
  } catch (error) {
    console.error('Error getting subscriptions:', error);
    return null;
  }
}
