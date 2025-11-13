'use client';
import { PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
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
import { formatCurrency } from '@/helpers/format-currency';

import { Services } from '../../../../../../generated/prisma';
import { deleteService } from '../_actions/delete-service';
import { DialogServiceForm } from './dialog-service.form';

interface ServicesListProps {
  services: Services[];
}

export function ServicesList({ services }: ServicesListProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleDeleteService({ serviceId }: { serviceId: string }) {
    try {
      if (!serviceId) {
        toast.error('ID do serviço inválido.');
        return;
      }

      deleteService({ serviceId });
      router.refresh();
      toast.success('Serviço excluído com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir o serviço. Por favor, tente novamente.');
      console.error('Erro ao excluir o serviço:', error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <section className="mx-auto">
        <Card>
          <CardHeader className="flex items-center">
            <CardTitle className="text-xl md:text-3 xl font-bold">Serviços</CardTitle>

            <DialogTrigger asChild>
              <Button variant="default" className="ml-auto">
                <PlusIcon className="size-4" />
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Novo serviço</DialogTitle>
                <DialogDescription>Adicione um novo serviço.</DialogDescription>
              </DialogHeader>

              <DialogServiceForm closeModal={() => setOpen(false)} />
            </DialogContent>
          </CardHeader>

          <CardContent>
            <section className="mt-6">
              {services.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum serviço cadastrado.</p>
              ) : (
                <article className="space-y-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between gap-2 border-b pb-3"
                    >
                      <div className="flex gap-2 items-center">
                        <h3 className="font-semibold text-lg">{service.name}</h3>
                        <span className="text-gray-500">–</span>
                        <span className="text-lg">{formatCurrency(service.price)}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline">
                          Editar
                          <PencilIcon className="size-4" />
                        </Button>
                        <Button onClick={() => handleDeleteService({ serviceId: service.id })}>
                          Excluir
                          <TrashIcon className="size-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </article>
              )}
            </section>
          </CardContent>
        </Card>
      </section>
    </Dialog>
  );
}
