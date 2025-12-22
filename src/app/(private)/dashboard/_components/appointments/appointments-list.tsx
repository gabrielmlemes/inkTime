'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { EyeIcon, X } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';

import { Prisma } from '../../../../../../generated/prisma';
import { cancelAppointment } from '../../_actions/cancel-appointment';

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
  const queryClient = useQueryClient();

  const {
    data: response,
    isLoading,
    refetch,
  } = useQuery({
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
    staleTime: 20000, // 20 segundos -> tempo em que os dados são mantidos no cache do navegador antes de serem considerados "obsoletos". Após esse período, na próxima vez que a consulta for feita, os dados serão buscados novamente.
    // refetchInterval: 60000, // 1 minuto -> intervalo em que a consulta será refeita automaticamente para obter dados atualizados.
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

  async function handleCancelAppointment(appointmentId: string) {
    const response = await cancelAppointment({ appointmentId });
    if (!response || response.error) {
      toast.error('Erro ao cancelar agendamento');
      return;
    }

    queryClient.invalidateQueries({ queryKey: ['get-appointments'] }); // Invalida o cache para forçar a atualização e refetch();
    await refetch(); // Faz o refetch manualmente para atualizar a lista imediatamente
    toast.success(response.success || 'Agendamento cancelado com sucesso');
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

                <div className="ml-auto gap-1 flex">
                  <div className="flex items-center">
                    <Button variant="ghost" size="sm">
                      <EyeIcon size="4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCancelAppointment(occupant.id)}
                    >
                      <X size="4" />
                    </Button>
                  </div>
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
