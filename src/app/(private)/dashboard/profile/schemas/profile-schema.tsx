'use client';

import { z } from 'zod';

import { PHONE_REGEX } from '@/utils/regex';

export const profileSchema = z.object({
  name: z.string().min(3, 'O nome é obrigatório'),
  address: z.string().optional(),
  phone: z.string().regex(PHONE_REGEX, 'Insira um número de telefone válido'),
  status: z.boolean(),
  times: z.array(z.string()),
  timezone: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
