import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';

// Rota protegida para buscar agendamentos do estúdio (só acessível se estiver autenticado)
export const GET = auth(async function GET(request) {
  if (!request.auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const searchParams = request.nextUrl.searchParams;
  const dateParams = searchParams.get('date') as string;

  if (!dateParams) {
    return NextResponse.json({ error: 'Data inválida' }, { status: 400 });
  }

  const studioId = request.auth?.user?.id;

  if (!studioId) {
    return NextResponse.json({ error: 'ID do estúdio não encontrado' }, { status: 400 });
  }

  try {
    const [year, month, day] = dateParams.split('-').map(Number); // Converte a data recebida em um objeto Date para manipulação posterior
    const startDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0)); // Início do dia
    const endDate = new Date(Date.UTC(year, month - 1, day, 23, 59, 59, 999)); // Fim do dia

    console.log('startDate:', startDate);
    console.log('endDate:', endDate);

    const appointments = await prisma.appointment.findMany({
      where: {
        userId: studioId,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      include: {
        service: true,
      },
    });

    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: 'Erro ao buscar agendamentos' }, { status: 400 });
  }
});
