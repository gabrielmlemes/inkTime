'use client';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { DialogServiceForm } from './dialog-service.form';

export function ServicesList() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <section className="mx-auto">
        <Card>
          <CardHeader className="flex items-center">
            <CardTitle className="text-xl md:text-2xl font-bold">Serviços</CardTitle>

            <DialogTrigger asChild>
              <Button variant="default" className="ml-auto">
                <PlusIcon className="size-4" />
              </Button>
            </DialogTrigger>
          </CardHeader>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Novo serviço</DialogTitle>
              <DialogDescription>Adicione um novo serviço.</DialogDescription>
            </DialogHeader>

            <DialogServiceForm closeModal={() => setOpen(false)} />
          </DialogContent>
        </Card>
      </section>
    </Dialog>
  );
}
