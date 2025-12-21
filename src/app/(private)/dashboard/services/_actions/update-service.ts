'use server';
import { revalidatePath } from 'next/cache';
import z from 'zod';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

const updateServiceSchema = z.object({
  serviceId: z.string().min(1, { message: 'O id do serviço é obrigatório' }),
  name: z.string().min(1, { message: 'O nome do serviço é obrigatório' }),
  priceInCents: z.number().min(1, { message: 'O preço do serviço é obrigatório' }),
  duration: z.number(),
});
export type UpdateServiceFormSchema = z.infer<typeof updateServiceSchema>;

export async function updateServiceById({
  serviceId,
  name,
  priceInCents,
  duration,
}: {
  serviceId: string;
  name: string;
  priceInCents: number;
  duration: number;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const schema = updateServiceSchema.safeParse({
    serviceId,
    name,
    priceInCents,
    duration,
  });
  if (!schema.success) {
    return { error: schema.error.issues[0].message };
  }

  try {
    await prisma.services.update({
      where: { id: serviceId },
      data: {
        name,
        price: priceInCents,
        duration,
      },
    });

    revalidatePath('/dashboard/services');

    return { data: 'Serviço atualizado com sucesso' };
  } catch (error) {
    console.error('Error updating service:', error);
    return {
      error: 'Erro ao atualizar o serviço. Por favor, tente novamente.',
    };
  }
}
