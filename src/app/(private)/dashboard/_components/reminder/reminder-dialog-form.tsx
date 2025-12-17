'use client';

import { NotebookPen } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { createReminder } from '../../_actions/create-reminder';
import { useReminderDialogForm } from '../../_hooks/useReminderForm';
import { ReminderDialogSchema } from '../../_schema/reminder-dialog-schema';

interface ReminderDialogFormProps {
  closeModal: () => void;
}

export function ReminderDialogForm({ closeModal }: ReminderDialogFormProps) {
  const router = useRouter();
  const form = useReminderDialogForm();
  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(data: ReminderDialogSchema) {
    const response = await createReminder(data);

    if (!response.success) {
      toast.error(response.error);
      return;
    }

    toast.success(response.success);
    router.refresh();
    closeModal();
    form.reset();
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição do lembrete</FormLabel>
                <FormControl>
                  <Input placeholder="Digite a descrição do lembrete..." {...field} required />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting || !form.watch('description')}
            loading={isSubmitting}
            className="w-full select-none"
          >
            <NotebookPen />
            Criar lembrete
          </Button>
        </form>
      </Form>
    </div>
  );
}
