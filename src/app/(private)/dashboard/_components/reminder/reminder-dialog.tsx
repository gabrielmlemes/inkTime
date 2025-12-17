'use client';

import { PlusIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { ReminderDialogForm } from './reminder-dialog-form';

export function ReminderDialog() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <PlusIcon />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="border-b border-gray-500 pb-2">Novo lembrete</DialogTitle>
        </DialogHeader>

        <ReminderDialogForm closeModal={() => setModalOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
