import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import GameGrid from "../components/GameGrid.jsx";
import GameGridSkeleton from "../components/GameGridSkeleton.jsx";
import SideNav from "../components/SideNav.jsx";
import { useI18n } from "../i18n.jsx";
import { fetchGames, matchesGameSearch } from "../services/api.js";

function SearchPage({ isMobileMenuOpen, onMobileMenuClose }) {
  const { t } = useI18n();
  const [games, setGames] = useState([]);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGames(8)
      .then(setGames)
      .finally(() => setIsLoading(false));
  }, []);

  const results = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return games.slice(0, 24);
    }

    return games.filter((game) => matchesGameSearch(game, normalizedQuery));
  }, [games, query]);

  return (
    <div className="portal-layout">
      <SideNav isOpen={isMobileMenuOpen} onClose={onMobileMenuClose} />
      <div className="page search-page">
        <section className="search-panel">
          <div className="section-title">
            <div>
              <h1>{t("search.title")}</h1>
              <p>{query.trim() ? t("search.resultsFound", { count: results.length }) : t("search.hint")}</p>
            </div>
          </div>

          <label className="search-page-input">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t("search.placeholder")}
              autoFocus
            />
            <Search size={24} />
          </label>
        </section>

        {isLoading ? <GameGridSkeleton count={10} /> : <GameGrid games={results} />}
      </div>
    </div>
  );
}

export default SearchPage;
