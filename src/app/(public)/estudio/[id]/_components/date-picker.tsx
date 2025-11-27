'use client';

import { ptBR } from 'date-fns/locale/pt-BR';
import { Calendar1Icon } from 'lucide-react';
import { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';

registerLocale('pt-BR', ptBR);

interface DateTimePickerProps {
  minDate?: Date;
  className?: string;
  initialDate?: Date;
  onChange: (date: Date) => void;
}

export function DateTimePicker({ minDate, className, initialDate, onChange }: DateTimePickerProps) {
  const [startDate, setStartDate] = useState<Date | null>(initialDate ?? new Date());

  function handleSelectDate(date: Date | null) {
    if (!date) return;

    console.log(date);

    setStartDate(date);
    onChange(date);
  }

  return (
    <DatePicker
      selected={startDate}
      className={className}
      minDate={minDate ?? new Date()}
      onChange={handleSelectDate}
      dateFormat="dd/MM/yyyy"
    />
  );
}
