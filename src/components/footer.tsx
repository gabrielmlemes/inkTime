import Link from 'next/link';

import Logo from '../components/logo';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/50">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <div className="flex flex-col items-center justify-center md:flex-row md:space-y-0 space-y-4">
          {/* Logo, Copyright & Legal Links */}
          <div className="flex flex-col items-center md:items-center md:flex-row md:space-x-4 space-y-2 md:space-y-0">
            <Logo href="#" />
            <p className="text-sm leading-5 text-center text-muted-foreground">
              &copy; {new Date().getFullYear()} Inkore. Todos os direitos reservados.
            </p>

            <div className="flex space-x-4 text-sm leading-5 text-center items-center">
              <Link
                href="#"
                className="text-muted-foreground flex-1 hover:text-primary transition-colors"
              >
                Política de Privacidade
              </Link>
              <Link
                href="#"
                className="text-muted-foreground flex-1 hover:text-primary transition-colors"
              >
                Termos de Serviço
              </Link>

              <div className="flex flex-col items-center md:flex-row md:gap-1">
                <p className="text-sm leading-5  text-center text-muted-foreground">
                  Desenvolvido por
                </p>
                <Link href="https://gabrielmlemes.vercel.app/"> @Gabriel Lemes</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
