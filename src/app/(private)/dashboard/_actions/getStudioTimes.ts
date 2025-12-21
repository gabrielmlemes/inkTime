'use server';

import z from 'zod';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

const getStudioTimesSchema = z.object({
  userId: z.string().min(1, { message: 'O id do usuário é obrigatório' }),
});
export type GetStudioTimesFormSchema = z.infer<typeof getStudioTimesSchema>;

export async function getStudioTimes({ userId }: GetStudioTimesFormSchema) {
  const session = await auth();
  if (!session) {
    throw new Error('Usuário não autenticado');
  }

  const schema = getStudioTimesSchema.safeParse({ userId });
  if (!schema.success) {
    return { error: schema.error.issues[0].message };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        times: true,
      },
    });

    if (!user) {
      return { error: 'Usuário não encontrado' };
    }

    return { times: user.times || [] };
  } catch (error) {
    console.error('Erro ao buscar horários do estúdio:', error);
    return { error: 'Erro ao buscar horários do estúdio' };
  }
}
