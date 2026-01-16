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
  times: z.array(z.string()),
});
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/[^\w\-]+/g, '') // Remove todos os caracteres não-alfanuméricos, exceto hífens
    .replace(/--+/g, '-'); // Substitui múltiplos hífens por um único
}

async function generateUniqueSlug(baseSlug: string, userId: string): Promise<string> {
  let finalSlug = baseSlug;
  let counter = 2;
  while (
    await prisma.user.findFirst({
      where: {
        slug: finalSlug,
        id: {
          not: userId, // Garante que o slug não pertence a outro usuário
        },
      },
    })
  ) {
    finalSlug = `${baseSlug}-${counter}`;
    counter++;
  }
  return finalSlug;
}

export async function updateProfile(data: UpdateProfileFormData) {
  const schema = updateProfileSchema.safeParse(data);
  if (!schema.success) {
    throw new Error('Validation failed');
  }

  const session = await getServerSession();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const baseSlug = generateSlug(data.name);
  const uniqueSlug = await generateUniqueSlug(baseSlug, session.user.id);

  try {
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: data.name,
        slug: uniqueSlug,
        address: data.address,
        phone: data.phone,
        status: data.status,
        times: data.times,
      },
    });

    revalidatePath('/dashboard/perfil');

    return user;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw new Error('Failed to update profile');
  }
}
