import z from 'zod';

export const scheduleFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(1, 'O telefone é obrigatório'),
  date: z.string().min(1, 'A data é obrigatória'),
  serviceId: z.string().min(1, 'O serviço é obrigatório'),
});

export type ScheduleFormData = z.infer<typeof scheduleFormSchema>;
