import { PrismaAdapter } from '@auth/prisma-adapter';
import NextAuth from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

import prisma from './prisma';

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/[^\w\-]+/g, '') // Remove todos os caracteres não-alfanuméricos, exceto hífens
    .replace(/--+/g, '-'); // Substitui múltiplos hífens por um único
}

async function generateUniqueSlug(baseSlug: string): Promise<string> {
  let finalSlug = baseSlug;
  let counter = 2;
  while (await prisma.user.findUnique({ where: { slug: finalSlug } })) {
    finalSlug = `${baseSlug}-${counter}`;
    counter++;
  }
  return finalSlug;
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma) as Adapter,
  trustHost: true,
  providers: [GitHub, Google],
  callbacks: {
    async session({ session }) {
      const userFromDb = await prisma.user.findUnique({
        where: { email: session.user.email as string },
        include: {
          subscription: true,
        },
      });

      if (userFromDb) {
        session.user.id = userFromDb.id;
        session.user.slug = userFromDb.slug;
        session.user.subscription = userFromDb.subscription;
      }

      return session;
    },
  },
  events: {
    async createUser(message) {
      if (message.user.name) {
        const baseSlug = generateSlug(message.user.name);
        const uniqueSlug = await generateUniqueSlug(baseSlug);

        await prisma.user.update({
          where: { id: message.user.id },
          data: { slug: uniqueSlug },
        });
      }
    },
  },
});
