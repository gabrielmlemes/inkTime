'use client';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { deleteAllReminders } from '../../_actions/delete-all-reminders';

export function DeleteAllReminders() {
  const [modalOpen, setModalOpen] = useState(false);

  async function handleDeleteAllReminders() {
    try {
      await deleteAllReminders();
      setModalOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Tooltip>
          <TooltipTrigger>
            <Button size="icon" onClick={() => setModalOpen(true)}>
              <Trash2 />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">Excluir todos os lembretes</TooltipContent>
        </Tooltip>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deseja excluir todos os lembretes?</DialogTitle>
          <DialogDescription className="border-b border-gray-500 pb-2">
            Esta ação não pode ser desfeita.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2 mt-2">
          <Button className="flex-1" onClick={handleDeleteAllReminders}>
            Excluir todos os lembretes
          </Button>
          <Button className="flex-1" variant="outline" onClick={() => setModalOpen(false)}>
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
