'use server';
import { revalidatePath } from 'next/cache';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function deleteAllReminders() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  try {
    await prisma.reminder.deleteMany({
      where: {
        userId: session.user.id,
      },
    });

    revalidatePath('/dashboard');

    return {
      message: 'Lembretes deletados com sucesso!',
    };
  } catch (error) {
    console.log(error);

    return {
      error: 'Erro ao deletar os lembretes. Por favor, tente novamente.',
    };
  }
}
