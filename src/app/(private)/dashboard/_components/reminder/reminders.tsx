import { NotebookText } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { getReminders } from '../../_data-access-layer/reminders';
import { DeleteAllReminders } from './delete-all-reminders';
import { ReminderDialog } from './reminder-dialog';
import { RemindersList } from './reminder-list';

export async function Reminders({ userId }: Readonly<{ userId: string }>) {
  const reminders = await getReminders({ userId });

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-xl lg:text-2xl flex items-center gap-2">
          <NotebookText />
          Lembretes
        </CardTitle>

        <div className="flex items-center gap-3">
          <DeleteAllReminders />

          <Tooltip>
            <TooltipTrigger>
              <ReminderDialog />
            </TooltipTrigger>
            <TooltipContent side="top">Adicionar lembrete</TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>

      <CardContent>
        <ScrollArea>
          {!reminders.length ? (
            <p className="text-muted-foreground text-sm">
              Você não adicionou nenhum lembrete ainda!
            </p>
          ) : (
            <article className="flex flex-col gap-4">
              {reminders.map((reminder) => (
                <RemindersList key={reminder.id} reminder={reminder} />
              ))}
            </article>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
