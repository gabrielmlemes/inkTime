'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { convertRealtoCents } from '@/helpers/convertCurrency';

import { createService } from '../_actions/create-service';
import { ServiceFormData, serviceFormSchema } from '../_schemas/services-schema';

interface DialogServiceFormProps {
  closeModal: () => void;
}

const defaultValues: ServiceFormData = {
  name: '',
  price: '',
  hours: '',
  minutes: '',
};

export function DialogServiceForm({ closeModal }: DialogServiceFormProps) {
  const router = useRouter();
  const form = useForm<ServiceFormData>({
    resolver: zodResolver(serviceFormSchema),
    defaultValues,
  });

  const isSubmitting = form.formState.isSubmitting;

  async function onSubmit(data: ServiceFormData) {
    const priceInCents = convertRealtoCents(data.price);
    const hours = parseInt(data.hours ?? '') || 0;
    const minutes = parseInt(data.minutes ?? '') || 0;
    const durationInMinutes = hours * 60 + minutes;

    const response = await createService({
      name: data.name,
      price: priceInCents,
      duration: durationInMinutes,
    });

    if (response.error) {
      toast.error(response.error);
      closeModal();
      return;
    }

    toast.success('Serviço criado com sucesso!');
    form.reset();
    closeModal();
    router.refresh();
  }

  function changeCurrencyFormat(event: React.ChangeEvent<HTMLInputElement>) {
    let { value } = event.target;
    value = value.replace(/\D/g, ''); // Remove tudo que não for dígito

    if (value) {
      value = (parseInt(value, 10) / 100).toFixed(2); // Converte para número com 2 casas decimais
      value = value.replace('.', ','); // Troca ponto por vírgula -> Ex: 10.50 para 10,50

      value = value.replace(/\B(?=(\d{3})+(?!\d))/g, '.'); // Adiciona pontos a cada 3 dígitos -> Ex: 1000 para 1.000
    }

    event.target.value = value;
    form.setValue('price', event.target.value); // Atualiza o valor no formulário

    // Se quiser o valor em centavos -> Valor em reais * 100
    // Se quiser o valor em reais -> Valor em centavos / 100
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Nome do serviço</FormLabel>
                <FormControl>
                  <Input required placeholder="Digite o nome do serviço" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="price"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">Preço do serviço</FormLabel>
                <FormControl>
                  <Input
                    required
                    placeholder="Digite o preço do serviço"
                    {...field}
                    onChange={changeCurrencyFormat}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="font-semibold">Tempo de duração do serviço</p>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              name="hours"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Horas</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="minutes"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold">Minutos</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 30" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Salvando...' : 'Salvar serviço'}
        </Button>
      </form>
    </Form>
  );
}
