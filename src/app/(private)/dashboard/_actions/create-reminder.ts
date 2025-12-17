'use server';

import { revalidatePath } from 'next/cache';
import z from 'zod';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

const createReminderSchema = z.object({
  description: z.string().min(1, 'A descrição é obrigatória'),
});
type CreateReminderSchema = z.infer<typeof createReminderSchema>;

export async function createReminder({ description }: CreateReminderSchema) {
  const schema = createReminderSchema.safeParse(description);

  if (!schema) {
    return {
      error: 'Descrição inválida',
    };
  }

  const session = await auth();
  if (!session) {
    throw new Error('Usuário não autenticado');
  }

  try {
    await prisma.reminder.create({
      data: {
        description,
        userId: session.user.id,
      },
    });

    revalidatePath('/dashboard');

    return {
      success: 'Lembrete criado com sucesso',
    };
  } catch (error) {
    console.log(error);
    return {
      error: 'Erro ao criar lembrete',
    };
  }
}
