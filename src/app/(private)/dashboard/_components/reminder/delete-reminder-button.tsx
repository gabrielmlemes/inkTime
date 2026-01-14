'use client';

import { Loader2, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { deleteReminder } from '../../_actions/delete-reminder';

export function DeleteReminderButton({ id }: { id: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleDeleteReminder() {
    startTransition(async () => {
      const response = await deleteReminder({ id });

      if (!response.message) {
        toast.error(response.error);
        return;
      }

      toast.success(response.message);
      router.refresh();
    });
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button onClick={handleDeleteReminder} disabled={isPending} variant="destructive">
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <TrashIcon className="h-4 w-4" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">Apagar lembrete</TooltipContent>
    </Tooltip>
  );
}
