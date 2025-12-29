'use server';

import prisma from '@/lib/prisma';

export async function getStudio() {
  try {
    const studio = await prisma.user.findFirst({
      where: {
        status: true,
      },
    });

    return studio;
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong!');
  }
}
