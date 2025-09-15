/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoaderCircle } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserInfoProps extends React.ComponentProps<'div'> {
  session: any;
  status: any;
}

export function UserInfo({ session, status, ...props }: UserInfoProps) {
  return (
    <div {...props}>
      {status === 'loading' ? (
        <LoaderCircle className="size-5 text-primary animate-spin" />
      ) : (
        session && (
          <div className="flex items-center space-x-2 transition-transform duration-300 ease-in-out hover:scale-105">
            <Avatar>
              <AvatarImage src={session?.user?.image} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            <Link
              href="#"
              className="transition-transform duration-300 ease-in-out hover:scale-106 cursor-pointer"
            >
              {session?.user?.name || 'Menu'}
            </Link>
          </div>
        )
      )}
    </div>
  );
}
