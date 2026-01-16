'use client';

import { LinkIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function CopyLinkButton({ userSlug }: Readonly<{ userSlug: string }>) {
  async function handleCopyLink() {
    await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_APP_URL}/estudio/${userSlug}`);
    toast.success('Link copiado com sucesso!');
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" onClick={handleCopyLink}>
          <LinkIcon />
        </Button>
      </TooltipTrigger>
      <TooltipContent>Copiar link da página de agendamentos</TooltipContent>
    </Tooltip>
  );
}
