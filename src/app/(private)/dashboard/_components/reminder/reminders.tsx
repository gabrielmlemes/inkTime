import { NotebookPen, PlusIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import getServerSession from '@/lib/get-server-session';

import { getReminders } from '../../_data-access-layer/reminders';
import { RemindersList } from './reminder-list';

export async function Reminders({ userId }: Readonly<{ userId: string }>) {
  const session = await getServerSession();

  if (!session) {
    throw new Error('Usuário não autenticado');
  }

  const reminders = await getReminders({ userId });

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-xl lg:text-2xl flex items-center gap-2">
          <NotebookPen />
          Lembretes
        </CardTitle>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">
              <PlusIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">Adicionar lembrete</TooltipContent>
        </Tooltip>
      </CardHeader>

      <CardContent>
        {!reminders.length ? (
          <p className="text-muted-foreground text-sm">Você não adicionou nenhum lembrete ainda!</p>
        ) : (
          <article className="flex flex-col gap-4">
            {reminders.map((reminder) => (
              <RemindersList key={reminder.id} reminder={reminder} />
            ))}
          </article>
        )}
      </CardContent>
    </Card>
  );
}
