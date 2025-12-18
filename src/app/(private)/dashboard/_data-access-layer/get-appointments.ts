'use server';

import prisma from '@/lib/prisma';

export async function getAppointments({ userId }: Readonly<{ userId: string }>) {
  if (!userId) {
    return [];
  }

  try {
    const appointments = await prisma.appointment.findMany({
      where: {
        userId: userId,
      },
      include: {
        service: true,
        user: true,
      },
      orderBy: {
        date: 'asc',
      },
    });

    if (!appointments) {
      return [];
    }

    return appointments;
  } catch (error) {
    console.log('Não foi possível buscar os agendamentos', error);
    return [];
  }
}
