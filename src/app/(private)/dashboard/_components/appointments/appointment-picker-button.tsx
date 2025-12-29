'use client';

import { format } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export function AppointmentPickerButton() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dateFromUrl = searchParams.get('date');

  // Inicializa com a data da URL (se existir) ou com a data atual
  const [selectedDate, setSelectedDate] = useState(dateFromUrl || format(new Date(), 'yyyy-MM-dd'));

  // Sincroniza o estado quando a URL mudar (ex: refresh da página)
  useEffect(() => {
    if (dateFromUrl) {
      setSelectedDate(dateFromUrl);
    } else {
      setSelectedDate(format(new Date(), 'yyyy-MM-dd'));
    }
  }, [dateFromUrl]);

  const handleChangeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);

    const url = new URL(window.location.href);
    url.searchParams.set('date', event.target.value);

    router.push(url.toString());
  };

  return (
    <input
      type="date"
      id="date"
      className="border-2 px-2 py-1 rounded-md text-sm md:text-base"
      value={selectedDate}
      onChange={handleChangeDate}
    />
  );
}
