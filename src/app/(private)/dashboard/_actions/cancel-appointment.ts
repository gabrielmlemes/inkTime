'use server';
import { revalidatePath } from 'next/cache';
import z from 'zod';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

const cancelAppointmentSchema = z.object({
  appointmentId: z.string().min(1, 'O ID do agendamento é obrigatório'),
});

export type CancelAppointmentInput = z.infer<typeof cancelAppointmentSchema>;

export async function cancelAppointment({ appointmentId }: CancelAppointmentInput) {
  const schema = cancelAppointmentSchema.parse({ appointmentId });
  if (!schema) {
    throw new Error('Invalid input data');
  }

  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  try {
    await prisma.appointment.delete({
      where: {
        id: appointmentId,
        userId: session.user.id,
      },
    });

    revalidatePath('/dashboard');

    return {
      success: 'Agendamento cancelado com sucesso',
    };
  } catch (error) {
    console.log(error);
    return {
      error: 'Erro ao cancelar agendamento',
    };
  }
}
