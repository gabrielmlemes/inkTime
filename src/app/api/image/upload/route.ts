import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME as string,
  api_key: process.env.CLOUDINARY_KEY as string,
  api_secret: process.env.CLOUDINARY_SECRET as string,
});

export const POST = async (request: Request) => {
  const formData = await request.formData();

  const file = formData.get('file') as File;
  const userId = formData.get('userId');

  if (!userId || userId === '') {
    return NextResponse.json({ error: 'Nenhum usuário encontrado' }, { status: 400 });
  }

  if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
    return NextResponse.json({ error: 'Tipo de arquivo não suportado' }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          tags: [`${userId}`],
          public_id: file.name,
        },
        function (error, result) {
          if (error) {
            reject(error);
            return;
          }

          resolve(result);
        }
      )
      .end(buffer);
  });

  return NextResponse.json(result, { status: 200 });
};
