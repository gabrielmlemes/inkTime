import { MapPin, UserCircle, UserIcon } from 'lucide-react';
import Image from 'next/image';

import { Prisma } from '../../../../../../generated/prisma/client';
import { ScheduleForm } from './schedule-form';

export type ScheduleContentProps = Prisma.UserGetPayload<{
  include: {
    subscription: true;
    services: {
      where: { isActive: true };
    };
  };
}>;

export default function ScheduleContent({ user }: { user: ScheduleContentProps }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="h-32 bg-primary" />

      <section className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <article className="flex flex-col items-center">
            <div className="-mt-20 relative w-40 h-40 rounded-full overflow-hidden bg-gray-100 border-4 border-gray-200">
              {user.image ? (
                <Image
                  alt="Imagem do perfil do estúdio"
                  src={user.image ?? <UserIcon />}
                  className="object-cover"
                  fill
                />
              ) : (
                <UserCircle className="w-full h-full text-gray-400" />
              )}
            </div>

            <h1 className="mt-4 text-3xl font-bold text-center">{user.name}</h1>
            <div className="mt-2 flex-col items-center justify-center ">
              <MapPin size="20" className="text-gray-400 text-center w-full mb-1" />
              <p className=" text-gray-400 text-center">
                {user.address ?? 'Endereço não informado'}
              </p>
            </div>

            <ScheduleForm user={user} />
          </article>
        </div>
      </section>
    </div>
  );
}
