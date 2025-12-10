'use server';

import { revalidatePath } from 'next/cache';
import z from 'zod';

import prisma from '@/lib/prisma';

const createAppointmentSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório'),
  email: z.string().min(1, 'O email é obrigatório'),
  phone: z.string().min(1, 'O telefone é obrigatório'),
  date: z.date(),
  serviceId: z.string().min(1, 'O serviço é obrigatório'),
  userId: z.string().min(1, 'O usuário é obrigatório'),
  time: z.string().min(1, 'O horário é obrigatório'),
});
export type CreateAppointmentFormData = z.infer<typeof createAppointmentSchema>;

export async function createAppointment(data: CreateAppointmentFormData) {
  const schema = createAppointmentSchema.safeParse(data);
  if (!schema.success) {
    return {
      error: schema.error.issues[0].message,
    };
  }

  try {
    const selectedDate = new Date(data.date);

    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    const day = selectedDate.getDate();

    const appointmentDate = new Date(year, month, day, 0, 0, 0, 0);

    const response = await prisma.appointment.create({
      data: {
        name: data.name,
        clientEmail: data.email,
        clientPhone: data.phone,
        date: appointmentDate,
        serviceId: data.serviceId,
        userId: data.userId,
        time: data.time,
      },
      include: {
        service: true,
        user: true,
      },
    });

    revalidatePath('/dashboard');
    return {
      data: response,
    };
  } catch (error) {
    console.error('Error creating appointment:', error);
    return {
      error: 'Erro ao criar o agendamento.',
    };
  }
}
