/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface UserInfoProps extends React.ComponentProps<'div'> {
  session: any;
}

export function UserInfo({ session, ...props }: UserInfoProps) {
  return (
    <div {...props}>
      {session ? (
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <Link href="/dashboard">{session?.user?.name || 'User'}</Link>
        </div>
      ) : (
        <div className="flex items-center space-x-2 transition-transform duration-300 ease-in-out hover:scale-105">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>

          <Link
            href="#"
            className="transition-transform duration-300 ease-in-out hover:scale-106 cursor-pointer"
          >
            Acessar studio
          </Link>
        </div>
      )}
    </div>
  );
}
