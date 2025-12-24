'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import { ChevronDownIcon } from 'lucide-react';
import { UserCircle } from 'lucide-react';
import Image from 'next/image';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { generateTime } from '@/helpers/generate-hours';
import { timeZonesFormatted } from '@/helpers/time-zones';
import { cn } from '@/lib/utils';
import { extractDigits, formatPhone } from '@/utils/format-phone';

import { Prisma } from '../../../../../../generated/prisma/client';
import { updateProfile } from '../_actions/update-profile';
import useProfileForm from '../_hooks/profile-form';
import { ProfileFormData } from '../_schemas/profile-schema';

type UserWithSubscription = Prisma.UserGetPayload<{
  include: { subscription: true };
}>;

interface ProfileFormProps {
  user: UserWithSubscription;
}

const ProfileForm = ({ user }: ProfileFormProps) => {
  const [selectedTimes, setSelectedTimes] = useState<string[]>(user.times || []);
  const [isPending, startTransition] = useTransition();
  const hours = generateTime();

  const toggleHour = (hour: string) => {
    setSelectedTimes((prevSelectedTimes) =>
      prevSelectedTimes.includes(hour)
        ? prevSelectedTimes.filter((time) => time !== hour)
        : [...prevSelectedTimes, hour].sort()
    );
  };

  const form = useProfileForm({
    name: user.name,
    address: user.address,
    phone: user.phone ? formatPhone(user.phone) : '',
    status: user.status,
    timezone: user.timezone,
  });

  async function onSubmit(data: ProfileFormData) {
    const phoneDigits = extractDigits(data.phone);

    startTransition(async () => {
      try {
        await updateProfile({
          name: data.name,
          address: data.address,
          phone: phoneDigits,
          status: data.status,
          timezone: data.timezone,
          times: selectedTimes || [],
        });
        toast.success('Perfil atualizado com sucesso!', { closeButton: true });
      } catch (error) {
        toast.error('Ocorreu um erro ao atualizar o perfil.');
        console.error(error);
      }
    });
  }

  return (
    <div className="mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Meu perfil</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex justify-center">
                <div className="relative w-40 h-40 rounded-full overflow-hidden bg-gray-100">
                  {user.image ? (
                    <Image
                      alt="Imagem do perfil do estúdio"
                      src={user.image}
                      className="object-cover"
                      fill
                    />
                  ) : (
                    <UserCircle className="w-full h-full text-gray-400" />
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <FormField
                  name="name"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Nome do estúdio:</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o nome do estúdio" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="address"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Endereço do estúdio:</FormLabel>
                      <FormControl>
                        <Input placeholder="Digite o endereço do estúdio" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="phone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Telefone do estúdio:</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Digite o telefone do estúdio"
                          {...field}
                          onChange={(e) => {
                            const formattedPhone = formatPhone(e.target.value);
                            field.onChange(formattedPhone);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="status"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Status:</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={(value) => field.onChange(value === 'active')}
                          value={field.value ? 'active' : 'inactive'}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>

                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="active">Ativo (Estúdio aberto)</SelectItem>
                              <SelectItem value="inactive">Inativo (Estúdio fechado)</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <Label className="font-bold">Configurar horários do estúdio</Label>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full justify-between">
                        Clique para selecionar
                        <SelectPrimitive.Icon asChild>
                          <ChevronDownIcon className="size-4 opacity-50" />
                        </SelectPrimitive.Icon>
                      </Button>
                    </DialogTrigger>

                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Horários do estúdio</DialogTitle>
                        <DialogDescription>
                          Selecione abaixo os horários de funcionamento do estúdio
                        </DialogDescription>
                      </DialogHeader>

                      <section className="py-4 grid grid-cols-5 gap-2">
                        {hours.map((hour) => (
                          <Button
                            key={hour}
                            type="button"
                            variant="outline"
                            onClick={() => toggleHour(hour)}
                            className={cn(
                              'border-2',
                              selectedTimes.includes(hour) && 'border-primary'
                            )}
                          >
                            {hour}
                          </Button>
                        ))}
                      </section>
                    </DialogContent>
                  </Dialog>
                </div>

                <FormField
                  name="timezone"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Fuso horário:</FormLabel>

                      <FormControl>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <SelectTrigger className="w-full justify-between">
                            <SelectValue placeholder="Selecione o seu fuso horário (opcional)" />
                          </SelectTrigger>

                          <SelectContent className="bg-muted">
                            {timeZonesFormatted.map((zone) => (
                              <SelectItem
                                value={zone}
                                key={zone}
                                className="hover:border cursor-pointer"
                              >
                                {zone}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" loading={isPending}>
                  Salvar alterações
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
