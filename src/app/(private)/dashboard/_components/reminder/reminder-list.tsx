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
    <div className="flex items-center justify-between gap-4 bg-yellow-100 p-2 rounded-lg">
      <div className="flex-1 min-w-0 items-center">
        <p className="text-sm text-secondary whitespace-pre-wrap wrap-break-word">
          <span className="mr-2">•</span>
          {reminder.description}
        </p>
      </div>

      <DeleteReminderButton id={reminder.id} />
    </div>
  );
}
