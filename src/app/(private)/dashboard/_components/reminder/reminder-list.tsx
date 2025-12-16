'use client';

import { DeleteReminderButton } from './delete-reminder-button';

interface RemindersListProps {
  reminder: {
    id: string;
    description: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

export function RemindersList({ reminder }: RemindersListProps) {
  return (
    <div className="flex items-center justify-between bg-yellow-100 p-2 rounded-lg">
      <p className="flex-1 min-w-0 break-words pr-4 text-sm text-secondary-foreground">
        {reminder.description}
      </p>

      <DeleteReminderButton id={reminder.id} />
    </div>
  );
}
