import { UserRoundCheck } from 'lucide-react';
import Link from 'next/link';

import { getStudioTimes } from '@/app/(private)/dashboard/_actions/getStudioTimes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

import { AppointmentPickerButton } from './appointment-picker-button';
import { AppointmentsList } from './appointments-list';

export async function Appointments({ userId }: Readonly<{ userId: string }>) {
  const studioTimes = await getStudioTimes({ userId });

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 lg:flex-row items-center justify-between flex-wrap">
        <CardTitle className="text-xl lg:text-2xl flex items-center gap-2">
          <UserRoundCheck />
          Agendamentos
        </CardTitle>

        <AppointmentPickerButton />
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-96 overflow-y-auto">
          {!studioTimes?.times || studioTimes.times.length === 0 ? (
            <div className="flex flex-col items-start justify-start gap-2">
              <p className="text-muted-foreground text-sm">
                Você não adicionou nenhum horário ainda!
              </p>
              <Link href="/dashboard/perfil" className="text-primary">
                Clique aqui para configurar seu perfil
              </Link>
            </div>
          ) : (
            <AppointmentsList times={studioTimes.times} />
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
