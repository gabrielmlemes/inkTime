import Link from 'next/link';

import Logo from '../components/logo';

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/50 text-muted-foreground">
      <div className="container mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Seção de Colunas */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mx-auto md:text-center">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Produto</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/#features" className="hover:text-primary transition-colors">
                  Funcionalidades
                </Link>
              </li>
              <li>
                <Link href="/#pricing" className="hover:text-primary transition-colors">
                  Preços
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/politicas-de-privacidade"
                  className="hover:text-primary transition-colors"
                >
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos-de-servico" className="hover:text-primary transition-colors">
                  Termos de Serviço
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna Contato/Redes Sociais */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Contato</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="mailto:inkorestudioo@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  inkorestudioo@gmail.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Seção Inferior */}
        <div className="mt-12 pt-8 border-t border-border/50 md:flex md:items-center md:justify-center">
          <div className="flex flex-col gap-2 items-center justify-center">
            <Logo href="/" />
            <p className="text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Inkore. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
