'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

const createServiceSchema = z.object({
  name: z.string().min(1, { message: 'O nome do serviço é obrigatório' }),
  price: z.number().min(1, { message: 'O preço do serviço é obrigatório' }),
  duration: z.number(),
});
type CreateServiceFormData = z.infer<typeof createServiceSchema>;

export async function createService(data: CreateServiceFormData) {
  const schema = createServiceSchema.safeParse(data);
  if (!schema.success) {
    return { error: schema.error.issues[0].message };
  }

  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  try {
    const newService = await prisma.services.create({
      data: {
        name: data.name,
        price: data.price,
        duration: data.duration,
        userId: session.user.id,
      },
    });

    revalidatePath('/dashboard/services');

    return {
      data: newService,
    };
  } catch (error) {
    console.error('Error creating service:', error);
    return {
      error: 'Erro ao criar o serviço. Por favor, tente novamente.',
    };
  }
}
