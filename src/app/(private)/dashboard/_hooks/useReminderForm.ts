import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ReminderDialogSchema, reminderDialogSchema } from '../_schema/reminder-dialog-schema';

export function useReminderDialogForm() {
  const form = useForm<ReminderDialogSchema>({
    resolver: zodResolver(reminderDialogSchema),
    defaultValues: {
      description: '',
    },
    mode: 'onBlur',
  });
  return form;
}
