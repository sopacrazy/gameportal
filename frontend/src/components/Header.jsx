import { Link } from "react-router-dom";
import { Bell, Bookmark, Menu, Search, Users } from "lucide-react";

function Header({ query, onSearch, onLogoClick, onMenuToggle }) {
  return (
    <header className="site-header">
      <button className="icon-button menu-button" type="button" onClick={onMenuToggle} aria-label="Abrir menu">
        <Menu size={26} />
      </button>
      <Link to="/" className="brand" onClick={onLogoClick}>
        <span className="brand-mark">G</span>
        <span>game<br />portal</span>
      </Link>
      <label className="top-search">
          <input
            id="portal-search"
            type="search"
            value={query}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Pesquisar jogos e categorias"
        />
        <Search size={24} />
      </label>
      <div className="header-actions">
        <button className="icon-button" type="button" aria-label="Comunidade">
          <Users size={22} />
        </button>
        <button className="icon-button" type="button" aria-label="Favoritos">
          <Bookmark size={22} />
        </button>
        <button className="icon-button" type="button" aria-label="Notificacoes">
          <Bell size={22} />
        </button>
        <button className="login-button" type="button">Entrar</button>
      </div>
    </header>
  );
}

export default Header;
