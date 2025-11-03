'use server';

import prisma from '@/lib/prisma';

interface getUserInfoProps {
  userId: string;
}

export async function getUserInfo({ userId }: getUserInfoProps) {
  try {
    if (!userId) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        subscription: true,
      },
    });

    if (!user) {
      return null;
    }

    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}
