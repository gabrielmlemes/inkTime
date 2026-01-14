import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

import Logo from '../components/logo';

const Footer = () => {
  const socialLinks = [
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Twitter, href: '#', name: 'Twitter' },
  ];

  return (
    <footer className="bg-background border-t border-border/50">
      <div className="mx-auto max-w-7xl px-6 py-8 sm:py-12 lg:px-8">
        <div className="flex flex-col items-center justify-between md:flex-row md:space-y-0 space-y-4">
          {/* Logo, Copyright & Legal Links */}
          <div className="flex flex-col items-center md:items-center md:flex-row md:space-x-4 space-y-2 md:space-y-0">
            <Logo href="#" />
            <p className="text-sm leading-5 text-muted-foreground">
              &copy; {new Date().getFullYear()} Inkore. Todos os direitos reservados.
            </p>
            <div className="flex space-x-4 text-sm leading-5">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Política de Privacidade
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                Termos de Serviço
              </Link>
            </div>
          </div>
          {/* Social Links */}
          <div className="flex space-x-6">
            {socialLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
