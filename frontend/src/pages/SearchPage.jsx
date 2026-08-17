import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import GameGrid from "../components/GameGrid.jsx";
import SideNav from "../components/SideNav.jsx";
import { fetchGames } from "../services/api.js";

function SearchPage({ isMobileMenuOpen, onMobileMenuClose }) {
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

    return games.filter((game) => {
      const categories = game.categories || [game.category];
      const tags = game.tags || [];

      return (
        game.title.toLowerCase().includes(normalizedQuery) ||
        game.category.toLowerCase().includes(normalizedQuery) ||
        game.description.toLowerCase().includes(normalizedQuery) ||
        categories.some((category) => category.toLowerCase().includes(normalizedQuery)) ||
        tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
      );
    });
  }, [games, query]);

  return (
    <div className="portal-layout">
      <SideNav isOpen={isMobileMenuOpen} onClose={onMobileMenuClose} />
      <div className="page search-page">
        <section className="search-panel">
          <div className="section-title">
            <div>
              <h1>Procurar jogos</h1>
              <p>{query.trim() ? `${results.length} resultados encontrados` : "Digite o nome ou categoria do jogo"}</p>
            </div>
          </div>

          <label className="search-page-input">
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Pesquisar jogos e categorias"
              autoFocus
            />
            <Search size={24} />
          </label>
        </section>

        {isLoading ? <p className="empty-state">Carregando jogos...</p> : <GameGrid games={results} />}
      </div>
    </div>
  );
}

export default SearchPage;
