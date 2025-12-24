'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

const deleteServiceSchema = z.object({
  serviceId: z.string().min(1, { message: 'O id do serviço é obrigatório' }),
});
export type DeleteServiceFormSchema = z.infer<typeof deleteServiceSchema>;

export async function deleteService(formData: DeleteServiceFormSchema) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const schema = deleteServiceSchema.safeParse(formData);
  if (!schema.success) {
    return { error: schema.error.issues[0].message };
  }

  try {
    await prisma.services.update({
      where: {
        id: formData.serviceId,
        userId: session.user.id,
      },
      data: {
        isActive: false,
      },
    });

    revalidatePath('/dashboard/servicos');

    return { data: 'Serviço deletado com sucesso' };
  } catch (error) {
    console.error('Error deleting service:', error);
    return {
      error: 'Erro ao deletar o serviço. Por favor, tente novamente.',
    };
  }
}
