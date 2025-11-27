import z from 'zod';

export const scheduleFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.email('E-mail inválido'),
  phone: z.string().min(1, 'O telefone é obrigatório'),
  date: z.date(),
  serviceId: z.string().min(1, 'O serviço é obrigatório'),
});

export type ScheduleFormData = z.infer<typeof scheduleFormSchema>;
