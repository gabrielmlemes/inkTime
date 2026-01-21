import Link from 'next/link';

interface SidebarLinkProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  pathname: string;
  isCollapsed: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}
import clsx from 'clsx';

const SidebarLink = ({ href, label, icon, pathname, isCollapsed, setIsOpen }: SidebarLinkProps) => {
  return (
    <Link href={href} onClick={() => setIsOpen && setIsOpen(false)}>
      <div
        className={clsx(
          'flex items-center gap-2.5 px-3 py-2 rounded-md text-white transition-colors cursor-pointer',
          {
            'bg-white/30 ': pathname === href,
            'bg-white/10 hover:bg-white/30': pathname !== href,
          }
        )}
      >
        <span className="w-6 h-6 text-primary">{icon}</span>
        {!isCollapsed && <span>{label}</span>}
      </div>
    </Link>
  );
};

export default SidebarLink;
