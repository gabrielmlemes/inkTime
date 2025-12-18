import { UserRoundCheck } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { getAppointments } from '../../_data-access-layer/get-appointments';
import { ReminderDialog } from '../reminder/reminder-dialog';
import { AppointmentsList } from './appointments-list';

export async function Appointments({ userId }: Readonly<{ userId: string }>) {
  const appointments = await getAppointments({ userId });
  const studioTimes = appointments[0]?.user.times;
  console.log('estudiotimes', studioTimes);
  console.log('appointments', appointments);

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-xl lg:text-2xl flex items-center gap-2">
          <UserRoundCheck />
          Agendamentos
        </CardTitle>

        <Tooltip>
          <TooltipTrigger>
            <ReminderDialog />
          </TooltipTrigger>
          <TooltipContent side="left">Adicionar lembrete</TooltipContent>
        </Tooltip>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-96 overflow-y-auto">
          {!studioTimes?.length ? (
            <p className="text-muted-foreground text-sm">
              Você não adicionou nenhum horário ainda!
            </p>
          ) : (
            <AppointmentsList times={studioTimes} />
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
