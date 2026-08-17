import { Bookmark, Home, Search } from "lucide-react";
import { Link } from "react-router-dom";

function MobileBottomNav() {
  return (
    <nav className="mobile-bottom-nav" aria-label="Navegacao mobile">
      <Link to="/" className="mobile-bottom-link" onClick={() => window.scrollTo({ top: 0, left: 0 })}>
        <Home size={23} />
        <span>Inicio</span>
      </Link>
      <Link to="/search" className="mobile-bottom-link">
        <Search size={25} />
        <span>Procurar</span>
      </Link>
      <Link to="/#continue" className="mobile-bottom-link">
        <Bookmark size={23} />
        <span>Meus jogos</span>
      </Link>
    </nav>
  );
}

export default MobileBottomNav;
