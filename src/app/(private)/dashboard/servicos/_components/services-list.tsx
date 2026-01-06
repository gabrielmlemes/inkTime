'use client';
import { PencilIcon, PencilOff, PlusIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
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
import { ResultPermissionProps } from '@/permissions/has-permission';

import { Services } from '../../../../../../generated/prisma';
import { deleteService } from '../_actions/delete-service';
import { DialogServiceForm } from './dialog-service.form';

interface ServicesListProps {
  services: Services[];
  permissions: ResultPermissionProps;
}

export function ServicesList({ services, permissions }: ServicesListProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editingService, setEditingService] = useState<Services | null>(null);

  const serviceList =
    permissions.hasPermission && permissions.planId !== 'BASIC'
      ? services
      : services.filter((service) => service.isActive === true).slice(0, 3);

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

  function handleEditService(service: Services) {
    setEditingService(service);
    setOpen(true);
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open: boolean) => {
        setOpen(open);

        if (!open) {
          setEditingService(null);
        }
      }}
    >
      <section className="mx-auto">
        <Card>
          <CardHeader className="flex items-center">
            <CardTitle className="text-xl md:text-3xl font-bold">Serviços</CardTitle>

            {permissions.hasPermission && (
              <DialogTrigger asChild>
                <Button variant="default" className="ml-auto">
                  <PlusIcon className="size-4" />
                </Button>
              </DialogTrigger>
            )}

            {!permissions.hasPermission && (
              <Link
                href="/dashboard/planos"
                className="ml-auto border text-muted-foreground rounded-md px-3 py-2 hover:bg-red-500/60 hover:border-red-500/60 font-semibold hover:text-white duration-200 transition-all"
              >
                <PencilOff />
              </Link>
            )}

            <DialogContent
              onInteractOutside={(e) => {
                e.preventDefault();
                setOpen(false);
                setEditingService(null);
              }}
            >
              <DialogHeader>
                <DialogTitle>Novo serviço</DialogTitle>
                <DialogDescription>Adicione um novo serviço.</DialogDescription>
              </DialogHeader>

              <DialogServiceForm
                closeModal={() => {
                  setOpen(false);
                  setEditingService(null);
                }}
                serviceId={editingService ? editingService.id : undefined}
                initialValues={
                  editingService
                    ? {
                        name: editingService.name,
                        price: (editingService.price / 100).toFixed(2).replace('.', ','),
                        hours: Math.floor(editingService.duration / 60).toString(),
                        minutes: (editingService.duration % 60).toString(),
                      }
                    : undefined
                }
              />
            </DialogContent>
          </CardHeader>

          <CardContent>
            <section className="mt-6">
              {services.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum serviço cadastrado.</p>
              ) : (
                <article className="space-y-4">
                  {serviceList.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-center justify-between gap-2 border-b pb-3"
                    >
                      <div className="flex gap-2 items-center">
                        <h3 className="font-semibold text-lg">{service.name}</h3>
                        <span className="text-gray-500">–</span>
                        <span className="text-lg">{formatCurrency(service.price)}</span>

                        <span className="text-lg">
                          {service.duration ? (
                            <div className="flex items-center gap-2">
                              <span className="text-gray-500">–</span>
                              <div>
                                <span className="text-lg">
                                  {Math.floor(service.duration / 60)}h
                                </span>
                                <span className="text-lg"> {service.duration % 60}min</span>
                              </div>
                            </div>
                          ) : (
                            ''
                          )}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => handleEditService(service)}>
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
