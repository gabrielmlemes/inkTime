'use client';

import 'react-datepicker/dist/react-datepicker.css';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

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

import { ScheduleFormData, scheduleFormSchema } from '../_schema/schedule-form-schema';
import { DateTimePicker } from './date-picker';
import type { ScheduleContentProps } from './schedule-content';

export function ScheduleForm({ user }: { user: ScheduleContentProps }) {
  const form = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      date: new Date(),
      serviceId: '',
    },
  });

  return (
    <section className="my-8 px-4 container">
      <Form {...form}>
        <form>
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
                      {...field}
                      initialDate={new Date()}
                      className="w-full rounded-lg border p-2 cursor-pointer"
                      onChange={(date) => field.onChange(date)}
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
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o serviço que deseja agendar" />
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
          </div>
        </form>
      </Form>
    </section>
  );
}
