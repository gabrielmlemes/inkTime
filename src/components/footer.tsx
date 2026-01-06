const Footer = () => {
  return (
    <footer className="bg-gray-800 text-muted-foreground p-4 text-center">
      <p>&copy; {new Date().getFullYear()} InkPRO. Todos os direitos reservados.</p>
      <p className="text-xs">Desenvolvido por Gabriel Lemes</p>
    </footer>
  );
};

export default Footer;
