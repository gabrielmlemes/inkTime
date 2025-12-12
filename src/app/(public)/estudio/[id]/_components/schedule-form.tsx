'use client';

import 'react-datepicker/dist/react-datepicker.css';

import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatPhone } from '@/utils/format-phone';

import { createAppointment } from '../_actions/create-appointment';
import { ScheduleFormData, scheduleFormSchema } from '../_schema/schedule-form-schema';
import { DateTimePicker } from './date-picker';
import type { ScheduleContentProps } from './schedule-content';
import { ScheduleTimesList } from './schedule-times-list';

export interface TimeSlot {
  time: string;
  available: boolean;
}

export function ScheduleForm({ user }: { user: ScheduleContentProps }) {
  const router = useRouter();

  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<TimeSlot[]>([]);
  const [loadingTimes, setLoadingTimes] = useState(false);
  const [blockedTimes, setBlockedTimes] = useState<string[]>([]);
  const [datePickerKey, setDatePickerKey] = useState(0);

  const form = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      date: new Date(),
      serviceId: '',
    },
    mode: 'onBlur',
  });

  const { watch } = form;
  const selectedDate = watch('date');
  const selectedService = watch('serviceId');
  const isSubmitting = form.formState.isSubmitting;

  function resetAllFields() {
    form.reset();
    setSelectedTime(null);
    setDatePickerKey((prevKey) => prevKey + 1);
  }

  async function handleRegisterAppointment(formData: ScheduleFormData) {
    if (!selectedTime) {
      toast.error('Por favor, selecione um horário.');
      return;
    }

    const appointment = {
      ...formData,
      time: selectedTime,
      userId: user.id,
    };

    try {
      await createAppointment(appointment);

      toast.success('Agendamento realizado com sucesso!');
      resetAllFields();

      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error('Erro ao realizar agendamento.');
      return;
    }
  }

  const fetchBlockedTimes = useCallback(
    async (date: Date): Promise<string[]> => {
      setLoadingTimes(true);

      try {
        const dateString = date.toISOString().split('T')[0];
        const response = await fetch(
          `/api/schedule/get-appointments?userId=${user.id}&date=${dateString}`
        );
        const data = await response.json();
        setLoadingTimes(false);

        return data; // Retorna um array com os horários que já estão bloqueados para o dia selecionado
      } catch (error) {
        console.log(error);
        setLoadingTimes(false);
        return [];
      } finally {
        setLoadingTimes(false);
      }
    },
    [user.id]
  );

  useEffect(() => {
    if (selectedDate) {
      fetchBlockedTimes(selectedDate).then((blockedTimes) => {
        setBlockedTimes(blockedTimes);

        const times = user.times || [];

        const finalAvailableSlots = times.map((time) => ({
          time: time,
          available: !blockedTimes.includes(time),
        }));

        setAvailableTimes(finalAvailableSlots);

        const stillAvailable = finalAvailableSlots.find(
          (slot) => slot.time === selectedTime && slot.available
        );

        if (!stillAvailable) {
          setSelectedTime('');
        }
      });
    }
  }, [fetchBlockedTimes, user.id, selectedDate, selectedTime, user.times]);

  return (
    <section className="my-8 px-4 container">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleRegisterAppointment)}>
          <div className="space-y-6 border border-gray-600 shadow-lg shadow-gray-700 p-6 rounded-lg">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input id="name" {...field} placeholder="Digite seu nome completo..." />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input id="email" {...field} placeholder="Digite seu e-mail..." />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="phone"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone (WhatsApp)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="phone"
                      type="tel"
                      placeholder="(99) 99999-9999"
                      onChange={(e) => {
                        const formattedPhone = formatPhone(e.target.value);
                        field.onChange(formattedPhone);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="date"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex items-center gap-2">
                  <FormLabel>Data do agendamento</FormLabel>
                  <FormControl>
                    <DateTimePicker
                      key={datePickerKey}
                      {...field}
                      initialDate={new Date()}
                      className="w-full rounded-lg border p-2 cursor-pointer"
                      onChange={(date) => {
                        field.onChange(date);
                        setSelectedTime(null);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name="serviceId"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col  gap-2">
                  <FormLabel>Selecione o serviço</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedTime(null);
                      }}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Clique para selecionar" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          {user.services.map((service) => (
                            <SelectItem key={service.id} value={service.id}>
                              {service.name} - ({Math.floor(service.duration / 60)}h{' '}
                              {service.duration % 60}min) - R$ {service.price / 100}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />

            {user.status === true && selectedService && (
              <div className="space-y-2">
                <FormLabel>Horários disponíveis</FormLabel>
                <div className="border border-gray-600 shadow-lg shadow-gray-7 p-4 rounded-lg">
                  {loadingTimes ? (
                    <LoaderCircle className="animate-spin mx-auto" />
                  ) : (
                    <ScheduleTimesList
                      studioTimes={user.times}
                      blockedTimes={blockedTimes}
                      availableTimes={availableTimes}
                      selectedDate={selectedDate}
                      selectedTime={selectedTime}
                      onTimeSelect={(time) => setSelectedTime(time)}
                      requiredSlots={
                        user.services.find((service) => service.id === selectedService)
                          ? Math.ceil(
                              user.services.find((service) => service.id === selectedService)!
                                .duration / 30
                            )
                          : 1
                      }
                    />
                  )}
                </div>
              </div>
            )}

            {user.status === true ? (
              <Button
                loading={isSubmitting}
                className="w-full"
                type="submit"
                disabled={
                  !watch('serviceId') ||
                  !watch('date') ||
                  !watch('name') ||
                  !watch('email') ||
                  !watch('phone')
                }
              >
                Realizar agendamento
              </Button>
            ) : (
              <p className="text-sm text-red-500 text-center">
                Agendamentos estão temporariamente desativados para este estúdio.
              </p>
            )}
          </div>
        </form>
      </Form>
    </section>
  );
}
