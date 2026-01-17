import type { User as PrismaUser } from '@prisma/client';
import { DefaultSession } from 'next-auth';

// O "module augmentation" é usado para estender os tipos existentes do next-auth
declare module 'next-auth' {
  /**
   * O objeto Session retornado por `auth()`, `useSession()`, etc.
   * Estendemos para incluir nossas propriedades customizadas.
   */
  interface Session {
    user: User & DefaultSession['user']; // Inclui as propriedades padrão como name, email, image
  }

  /**
   * O objeto User que é passado para o callback `session`
   * (e também o que está no banco de dados).
   * Estendemos para garantir que o tipo User do adapter inclua o slug.
   */
  interface User {
    id: string;
    name: string;
    email: string;
    emailVerified?: null | string | boolean;
    image?: string;
    stripe_customer_id?: string;
    times: string[];
    address?: string;
    phone?: string;
    status: boolean;
    timezone?: string | null;
    createdAt: string;
    updatedAt: string;
    slug: PrismaUser['slug'];
  }
}
