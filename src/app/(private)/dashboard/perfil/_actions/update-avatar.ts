'use server';

import { revalidatePath } from 'next/cache';
import z from 'zod';

import getServerSession from '@/lib/get-server-session';
import prisma from '@/lib/prisma';

const updateAvatarSchema = z.object({
  imageUrl: z.string().min(1, 'A imagem é obrigatória'),
});
export type UpdateAvatarFormData = z.infer<typeof updateAvatarSchema>;

export async function updateAvatar({ imageUrl }: UpdateAvatarFormData) {
  const schema = updateAvatarSchema.safeParse({ imageUrl });
  if (!schema.success) {
    throw new Error('Validation failed');
  }

  const session = await getServerSession();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: imageUrl,
      },
    });

    revalidatePath('/dashboard/perfil');

    return user;
  } catch (error) {
    console.log('Error updating avatar:', error);
    throw new Error('Failed to update avatar');
  }
}
