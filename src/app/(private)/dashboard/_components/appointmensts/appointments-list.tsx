'use client';

import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useSearchParams } from 'next/navigation';

interface AppointmentsListProps {
  times: string[];
}

export function AppointmentsList({ times }: AppointmentsListProps) {
  const searchParams = useSearchParams();
  const date = searchParams.get('date');

  const { data, isLoading } = useQuery({
    queryKey: ['get-appointments', date],
    queryFn: async () => {
      let activeDate = date;

      if (!activeDate) {
        const today = format(new Date(), 'yyyy-MM-dd');
        activeDate = today;
      }

      const url = `${process.env.NEXT_PUBLIC_APP_URL}/api/studio/appointments?date=${activeDate}`;

      const response = await fetch(url);
      if (!response.ok) {
        return [];
      }

      const data = await response.json();
      console.log(data);

      return data;
    },
  });

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
