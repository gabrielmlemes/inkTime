import z from 'zod';

export const reminderDialogSchema = z.object({
  description: z.string().min(1, 'A descrição do lembrete é obrigatória.'),
});

export type ReminderDialogSchema = z.infer<typeof reminderDialogSchema>;
