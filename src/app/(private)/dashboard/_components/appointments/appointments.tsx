import { UserRoundCheck } from 'lucide-react';

import { getStudioTimes } from '@/app/(private)/dashboard/_actions/getStudioTimes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { ReminderDialog } from '../reminder/reminder-dialog';
import { AppointmentsList } from './appointments-list';

export async function Appointments({ userId }: Readonly<{ userId: string }>) {
  const studioTimes = await getStudioTimes({ userId });

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-xl lg:text-2xl flex items-center gap-2">
          <UserRoundCheck />
          Agendamentos
        </CardTitle>

        <Tooltip>
          <TooltipTrigger asChild>
            <ReminderDialog />
          </TooltipTrigger>
          <TooltipContent side="left">Adicionar lembrete</TooltipContent>
        </Tooltip>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-96 overflow-y-auto">
          {!studioTimes?.times ? (
            <p className="text-muted-foreground text-sm">
              Você não adicionou nenhum horário ainda!
            </p>
          ) : (
            <AppointmentsList times={studioTimes.times} />
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
