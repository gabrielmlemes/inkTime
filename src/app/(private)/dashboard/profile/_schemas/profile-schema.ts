import { z } from 'zod';

export const profileSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  phone: z.string().min(1, 'O telefone é obrigatório'),
  status: z.boolean(),
  address: z.string().optional(),
  timezone: z.string().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
