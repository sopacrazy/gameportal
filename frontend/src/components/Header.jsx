import { Link } from "react-router-dom";
import { Bell, Bookmark, Menu, Search, Users } from "lucide-react";
import { useI18n } from "../i18n.jsx";

function Header({ query, onSearch, onLogoClick, onMenuToggle }) {
  const { languageNames, locale, locales, setLocale, t } = useI18n();

  return (
    <header className="site-header">
      <button className="icon-button menu-button" type="button" onClick={onMenuToggle} aria-label={t("header.openMenu")}>
        <Menu size={26} />
      </button>
      <Link to="/" className="brand" onClick={onLogoClick}>
        <span className="brand-mark">P</span>
        <span>Pitugames</span>
      </Link>
      <label className="top-search">
          <input
            id="portal-search"
            type="search"
            value={query}
          onChange={(event) => onSearch(event.target.value)}
          placeholder={t("header.searchPlaceholder")}
        />
        <Search size={24} />
      </label>
      <div className="header-actions">
        <label className="language-select" aria-label={t("header.language")}>
          <select value={locale} onChange={(event) => setLocale(event.target.value)}>
            {locales.map((item) => (
              <option key={item} value={item}>
                {languageNames[item]}
              </option>
            ))}
          </select>
        </label>
        <button className="icon-button" type="button" aria-label={t("header.community")}>
          <Users size={22} />
        </button>
        <button className="icon-button" type="button" aria-label={t("header.favorites")}>
          <Bookmark size={22} />
        </button>
        <button className="icon-button" type="button" aria-label={t("header.notifications")}>
          <Bell size={22} />
        </button>
        <button className="login-button" type="button">{t("header.login")}</button>
      </div>
    </header>
  );
}

export default Header;
