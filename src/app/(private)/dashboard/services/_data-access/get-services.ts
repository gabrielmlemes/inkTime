'use server';

import prisma from '@/lib/prisma';

export async function getServices({ userId }: { userId: string }) {
  if (!userId) {
    return null;
  }

  try {
    const services = await prisma.services.findMany({
      where: {
        userId,
        isActive: true,
      },
    });

    return services;
  } catch (error) {
    console.log(error);
    return null;
  }
}
