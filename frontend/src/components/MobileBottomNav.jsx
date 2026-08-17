import { Bookmark, Home, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { useI18n } from "../i18n.jsx";

function MobileBottomNav() {
  const { t } = useI18n();

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
      <Link to="/" className="mobile-bottom-link" onClick={() => window.scrollTo({ top: 0, left: 0 })}>
        <Home size={23} />
        <span>{t("mobile.home")}</span>
      </Link>
      <Link to="/search" className="mobile-bottom-link">
        <Search size={25} />
        <span>{t("mobile.search")}</span>
      </Link>
      <Link to="/#continue" className="mobile-bottom-link">
        <Bookmark size={23} />
        <span>{t("mobile.myGames")}</span>
      </Link>
    </nav>
  );
}

export default MobileBottomNav;
