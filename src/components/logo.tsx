import Image from 'next/image';
import Link from 'next/link';

import TattooIcon from '@/assets/tattoo-svgrepo-com.svg';

interface LogoProps {
  href: string;
}

const Logo = ({ href }: LogoProps) => {
  return (
    <>
      <Link href={href} className="font-bold text-3xl">
        <div className="flex items-center space-x-2 text-slate-100">
          Ink<span className="text-primary">PRO</span>
          <Image src={TattooIcon} alt="Logo InkPRO" width={30} height={30} />
        </div>
      </Link>
    </>
  );
};

export default Logo;
