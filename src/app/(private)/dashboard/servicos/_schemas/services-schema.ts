import z from 'zod';

export const serviceFormSchema = z.object({
  name: z.string().min(1, 'O nome do serviço é obrigatório.'),
  price: z.string().min(1, 'O preço do serviço é obrigatório.'),
  hours: z.string().optional(),
  minutes: z.string().optional(),
});
export type ServiceFormData = z.infer<typeof serviceFormSchema>;
