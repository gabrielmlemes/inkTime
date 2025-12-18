'use client';

import { useSearchParams } from 'next/navigation';

interface AppointmentsListProps {
  times: string[];
}

export function AppointmentsList({ times }: AppointmentsListProps) {
  const searchParams = useSearchParams();
  const date = searchParams.get('date');
  console.log('date', date);

  return (
    <section>
      {times.map((slot) => {
        return (
          <div key={slot} className="py-2 border-b last:border-0 flex items-center gap-5">
            <div className="font-semibold">{slot}</div>
            <span className="text-muted-foreground text-sm">Disponível</span>
          </div>
        );
      })}
    </section>
  );
}
