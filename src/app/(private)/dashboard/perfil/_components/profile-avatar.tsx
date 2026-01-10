'use client';

import { Loader2Icon, Upload, UserCircle } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { updateAvatar } from '../_actions/update-avatar';

interface AvatarProfileProps {
  imageUrl: string | null;
  userId: string;
}

export function AvatarProfile({ imageUrl, userId }: AvatarProfileProps) {
  const [previewImage, setPreviewImage] = useState(imageUrl);
  const [loadingImage, setLoadingImage] = useState(false);
  const router = useRouter();

  async function handleUploadImage(image: File): Promise<string | null> {
    try {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('userId', userId);

      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/image/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        toast.error('Erro ao enviar imagem.');
        return null;
      }

      const data = await response.json();

      return data.secure_url as string;
    } catch (error) {
      console.log(error);
      toast.error('Erro ao enviar imagem.');
      return null;
    }
  }

  async function handleChangeImage(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setLoadingImage(true);

      const image = e.target.files[0];

      if (image.type !== 'image/jpeg' && image.type !== 'image/png') {
        toast.error('Formato de imagem inválido.');
        setLoadingImage(false);
        return;
      }

      const newFileName = `${userId}_${Date.now()}`;
      const newFile = new File([image], newFileName, { type: image.type });

      const urlImage = await handleUploadImage(newFile);

      if (!urlImage || urlImage === '') {
        toast.error('Erro ao enviar imagem.');
        setLoadingImage(false);
        return;
      }

      setPreviewImage(urlImage);
      setLoadingImage(false);
      await updateAvatar({ imageUrl: urlImage });
      router.refresh();
      toast.success('Imagem atualizada com sucesso!');
    }
  }

  return (
    <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden bg-gray-100 border-4 border-gray-200">
      <div className="relative flex items-center justify-center w-full h-full overflow-hidden">
        <span className="absolute cursor-pointer z-10 bg-slate-50/80 p-2 rounded-full flex items-center justify-center shadow-xl">
          {loadingImage ? (
            <Loader2Icon className="animate-spin size-5" color="#131313" />
          ) : (
            <Upload size={16} color="#131313" />
          )}
        </span>

        <input
          type="file"
          className="cursor-pointer relative z-50 w-40 h-40 md:w-48 md:h-48 opacity-0"
          title="Fazer upload de uma nova imagem"
          onChange={handleChangeImage}
        />
      </div>

      {previewImage ? (
        <Image
          alt="Imagem do perfil do estúdio"
          src={previewImage}
          className="object-cover"
          fill
          quality={100}
          priority
        />
      ) : (
        <UserCircle className="w-full h-full text-gray-400" />
      )}
    </div>
  );
}
