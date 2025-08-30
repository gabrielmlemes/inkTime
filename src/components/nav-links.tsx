import Link from 'next/link';

import { NavItem } from '@/types/nav';

interface NavLinksProps extends React.ComponentProps<'nav'> {
  items: NavItem[];
  icon?: React.ReactNode;
}

function NavLinks({ items, icon, ...props }: NavLinksProps) {
  return (
    <nav {...props}>
      {items?.map((item) => (
        <Link href={item.href} key={item.name}>
          {item.name}
        </Link>
      ))}
      {icon}
    </nav>
  );
}
export default NavLinks;
