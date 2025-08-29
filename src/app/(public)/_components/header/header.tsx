import Link from "next/link";
import TattooIcon from "../../../../../public/tattoo-svgrepo-com.svg";

const Header = () => {
  return (
    <header className="fixed top-0 w-full z-20">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="font-bold text-2xl">
          <div className="flex items-center space-x-2">
            Ink<span className="text-primary">Time</span>
            <TattooIcon className="w-8 h-8" />
          </div>
        </Link>

        <nav>
          <Link href="#">Profissionais</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;

