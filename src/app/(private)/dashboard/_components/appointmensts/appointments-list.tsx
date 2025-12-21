'use client';

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';

import { Prisma } from '../../../../../../generated/prisma';

interface AppointmentsListProps {
  times: string[];
}

type AppointmentWithService = Prisma.AppointmentGetPayload<{
  include: {
    service: true;
  };
}>;

export function AppointmentsList({ times }: AppointmentsListProps) {
  const searchParams = useSearchParams();
  const date = searchParams.get('date');

  const { data: response, isLoading } = useQuery({
    queryKey: ['get-appointments', date],
    queryFn: async () => {
      let activeDate = date;

      if (!activeDate) {
        const today = format(new Date(), 'yyyy-MM-dd');
        activeDate = today;
      }

      const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/studio/appointments?date=${activeDate}`;

      const response = await fetch(url);
      if (!response.ok) {
        return [];
      }

      const data = (await response.json()) as AppointmentWithService[];

      return data;
    },
  });

  const occupantMap: Record<string, AppointmentWithService> = {};

  if (response) {
    for (const appointment of response) {
      // Calcula quantos slots o agendamento ocupa
      const requiredSlots = Math.ceil(appointment.service.duration / 30); // Ex: 45 minutos -> 2 slots de 30 minutos

      // Pega o índice do horário inicial
      const startIndex = times.indexOf(appointment.time); // Ex: "10:00" -> índice 4

      // Se encontrou o índice, marca os slots como ocupados
      if (startIndex !== -1) {
        for (let i = 0; i < requiredSlots; i++) {
          const slotIndex = startIndex + i;

          if (slotIndex < times.length) {
            occupantMap[times[slotIndex]] = appointment; // occupantMap["10:00"] = appointment
          }
        }
      }
    }
  }

  return (
    <section>
      {isLoading ? (
        <p>Carregando...</p>
      ) : (
        times.map((slot) => {
          const occupant = occupantMap[slot];

          if (occupant) {
            return (
              <div key={slot} className="py-2 border-b last:border-0 flex items-center gap-5">
                <div className="font-semibold">{slot}</div>
                <div className="flex flex-col gap-1">
                  <div className="font-semibold text-sm">{occupant.name}</div>
                  <div className="text-muted-foreground text-xs">{occupant.service.name}</div>
                </div>
              </div>
            );
          }

          return (
            <div key={slot} className="py-2 border-b last:border-0 flex items-center gap-5">
              <div className="font-semibold">{slot}</div>
              <span className="text-muted-foreground text-sm">Disponível</span>
            </div>
          );
        })
      )}
    </section>
  );
}
