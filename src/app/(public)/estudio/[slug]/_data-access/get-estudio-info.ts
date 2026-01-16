import prisma from '@/lib/prisma';

export async function getStudioInfo({ slug }: { slug: string }) {
  try {
    if (!slug) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        slug: slug,
      },
      include: {
        subscription: true,
        services: {
          where: {
            isActive: true,
          },
        },
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
