'use server';

import { revalidatePath } from 'next/cache';
import z from 'zod';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

const deleteReminderSchema = z.object({
  id: z.string().min(1, { message: 'O id do lembrete é obrigatório' }),
});
export type DeleteReminderFormSchema = z.infer<typeof deleteReminderSchema>;

export async function deleteReminder(data: DeleteReminderFormSchema) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const schema = deleteReminderSchema.safeParse(data);
  if (!schema.success) {
    return { error: schema.error.issues[0].message };
  }

  try {
    await prisma.reminder.delete({
      where: {
        id: data.id,
        userId: session.user.id,
      },
    });

    revalidatePath('/dashboard');

    return {
      message: 'Lembrete deletado com sucesso!',
    };
  } catch (error) {
    console.log(error);

    return {
      error: 'Erro ao deletar o lembrete. Por favor, tente novamente.',
    };
  }
}
