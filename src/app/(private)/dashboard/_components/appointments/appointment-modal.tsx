'use client';

import { format } from 'date-fns';

import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { formatCurrency } from '@/helpers/format-currency';

import type { AppointmentWithService } from './appointments-list';

interface AppointmentModalProps {
  appointment: AppointmentWithService;
}

export function AppointmentModal({ appointment }: AppointmentModalProps) {
  const status = appointment.status === 'scheduled' ? 'Agendado' : 'Não realizado';

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-center border-b border-gray-500 pb-2 font-semibold">
          Detalhes do agendamento
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-5">
        <div className="flex gap-1">
          <Label className="font-semibold">Nome:</Label>
          <p className="text-sm text-muted-foreground">{appointment.name}</p>
        </div>
        <div className="flex gap-1">
          <Label className="font-semibold">Email:</Label>
          <p className="text-sm text-muted-foreground">{appointment.clientEmail}</p>
        </div>
        <div className="flex gap-1">
          <Label className="font-semibold">Telefone:</Label>
          <p className="text-sm text-muted-foreground">{appointment.clientPhone}</p>
        </div>
        <div className="flex gap-1">
          <Label className="font-semibold">Serviço:</Label>
          <p className="text-sm text-muted-foreground">{appointment.service.name}</p>
        </div>
        <div className="flex gap-1">
          <Label className="font-semibold">Valor:</Label>
          {/* formatar valor para real*/}
          <p className="text-sm text-muted-foreground">
            {formatCurrency(appointment.service.price)}
          </p>
        </div>
        <div className="flex gap-1">
          <Label className="font-semibold">Data:</Label>
          <p className="text-sm text-muted-foreground">
            {new Intl.DateTimeFormat('pt-BR', {
              timeZone: 'UTC',
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }).format(new Date(appointment.date))}
          </p>
        </div>
        <div className="flex gap-1">
          <Label className="font-semibold">Horário agendado:</Label>
          <p className="text-sm text-muted-foreground">{appointment.time}</p>
        </div>
      </div>
    </DialogContent>
  );
}
