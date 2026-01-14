import Image from 'next/image';
import Link from 'next/link';

import TattooIcon from '@/assets/tattoo-svgrepo-com-white.svg';

interface LogoProps {
  href: string;
}

const WhiteLogo = ({ href }: LogoProps) => {
  return (
    <>
      <Link href={href} className="font-bold text-3xl">
        <div className="flex items-center space-x-2 text-slate-100">
          <Image src={TattooIcon} alt="Logo Inkore" width={70} height={70} />
        </div>
      </Link>
    </>
  );
};

export default WhiteLogo;
