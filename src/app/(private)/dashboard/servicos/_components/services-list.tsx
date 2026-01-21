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
          <CardHeader className="flex flex-wrap items-center justify-between">
            <CardTitle className="text-xl font-semibold uppercase tracking-wider leading-8 text-foreground">
              Serviços
            </CardTitle>

            {permissions.hasPermission && (
              <DialogTrigger asChild>
                <Button variant="outline" className="ml-auto">
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
            <section>
              {services.length === 0 ? (
                <p className="text-sm text-muted-foreground">Nenhum serviço cadastrado.</p>
              ) : (
                <article className="space-y-4">
                  {serviceList.map((service) => (
                    <div
                      key={service.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b pb-3"
                    >
                      <div className="flex flex-col gap-1 text-sm text-muted-foreground flex-grow">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground">{service.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>Preço:</span>
                          <span className="font-medium text-foreground">
                            {formatCurrency(service.price)}
                          </span>
                        </div>
                        {service.duration && (
                          <div className="flex items-center gap-2">
                            <span>Duração:</span>
                            <span className="font-medium text-foreground">
                              {Math.floor(service.duration / 60)}h {service.duration % 60}min
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-2 mt-2 sm:mt-0 flex-shrink-0">
                        <Button
                          variant="outline"
                          onClick={() => handleEditService(service)}
                          className="px-2 sm:px-4"
                        >
                          <span className="hidden sm:inline">Editar</span>
                          <PencilIcon className="size-4 sm:ml-2" />
                        </Button>
                        <Button
                          onClick={() => handleDeleteService({ serviceId: service.id })}
                          variant="destructive"
                          className="px-2 sm:px-4"
                        >
                          <span className="hidden sm:inline">Excluir</span>
                          <TrashIcon className="size-4 sm:ml-2" />
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
