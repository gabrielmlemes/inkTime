'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { ScheduleFormData, scheduleFormSchema } from '../_schema/schedule-form-schema';

export function ScheduleForm() {
  const form = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      date: '',
      serviceId: '',
    },
  });

  return <div>Schedule Form Component</div>;
}
