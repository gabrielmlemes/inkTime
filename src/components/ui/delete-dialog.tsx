'use client';

import { Loader2 } from 'lucide-react';

import { Button } from './button';
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from './dialog';

interface DeleteDialogProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dialogTitle?: string;
  dialogDescription?: string;
  deleteText?: string;
  cancelText?: string;
  onDelete: () => void;
  loading?: boolean;
}

export function DeleteDialog({
  setModalOpen,
  dialogTitle,
  dialogDescription,
  deleteText = 'Excluir',
  cancelText = 'Cancelar',
  onDelete,
  loading,
}: DeleteDialogProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogDescription className="border-b border-gray-500 pb-2">
          {dialogDescription}
        </DialogDescription>
      </DialogHeader>

      <div className="flex items-center gap-2 mt-2">
        <Button className="flex-1" onClick={onDelete} disabled={loading}>
          {loading ? <Loader2 className="size-4 animate-spin" /> : deleteText}
        </Button>
        <Button className="flex-1" variant="outline" onClick={() => setModalOpen(false)}>
          {cancelText}
        </Button>
      </div>
    </DialogContent>
  );
}
