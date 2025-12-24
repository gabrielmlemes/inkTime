'use server';
import { revalidatePath } from 'next/cache';
import z from 'zod';

import getServerSession from '@/lib/get-server-session';
import prisma from '@/lib/prisma';

const updateProfileSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  phone: z.string().min(1, 'O telefone é obrigatório'),
  status: z.boolean(),
  address: z.string().optional(),
  timezone: z.string().optional(),
  times: z.array(z.string()),
});
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

export async function updateProfile(data: UpdateProfileFormData) {
  const schema = updateProfileSchema.safeParse(data);
  if (!schema.success) {
    throw new Error('Validation failed');
  }

  const session = await getServerSession();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  try {
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: data.name,
        address: data.address,
        phone: data.phone,
        status: data.status,
        times: data.times,
        timezone: data.timezone,
      },
    });

    revalidatePath('/dashboard/perfil');

    return user;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw new Error('Failed to update profile');
  }
}
