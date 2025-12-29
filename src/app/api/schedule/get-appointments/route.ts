import { NextRequest, NextResponse } from 'next/server';

import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const userId = searchParams.get('userId');
  const dateParam = searchParams.get('date');

  if (!userId || userId === 'null' || !dateParam || dateParam === 'null') {
    return NextResponse.json({ error: 'Nenhum agendamento encontrado' }, { status: 400 });
  }

  try {
    const [year, month, day] = dateParam.split('-').map(Number); // Converte a data recebida em um objeto Date para manipulação posterior
    const startDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0)); // Início do dia
    const endDate = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999)); // Fim do dia

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'Usuário não encontrado' }, { status: 404 });
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        userId: user.id,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        service: true,
      },
    });

    // Montar com todos os slots ocupados
    const blockedSlots = new Set<string>();

    for (const appointment of appointments) {
      const requiredSlots = Math.ceil(appointment.service.duration / 30); // Cada slot tem 30 minutos, por isso divide por 30
      const startIndex = user.times.indexOf(appointment.time); // Pega o slot inicial

      if (startIndex !== -1) {
        for (let i = 0; i < requiredSlots; i++) {
          const blockedSlot = user.times[startIndex + i];
          if (blockedSlot) {
            blockedSlots.add(blockedSlot);
          }
        }
      }
    }

    const blockedTimes = Array.from(blockedSlots);

    return NextResponse.json(blockedTimes, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Erro ao buscar agendamentos' }, { status: 500 });
  }
}
