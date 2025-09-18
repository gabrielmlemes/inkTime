import Link from 'next/link';

interface SidebarLinkProps {
  href: string;
  label: string;
  icon?: React.ReactNode;
  pathname: string;
  isCollapsed: boolean;
}
import clsx from 'clsx';

const SidebarLink = ({ href, label, icon, pathname, isCollapsed }: SidebarLinkProps) => {
  return (
    <Link href={href}>
      <div
        className={clsx(
          'flex items-center gap-2 px-3 py-2 rounded-md text-white transition-colors cursor-pointer',
          {
            'bg-gray-800': pathname === href,
            'bg-white/10 hover:bg-white/20': pathname !== href,
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
