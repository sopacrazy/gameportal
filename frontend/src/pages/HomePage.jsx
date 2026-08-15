import { useEffect, useMemo, useState } from "react";
import GameGrid from "../components/GameGrid.jsx";
import GameRail from "../components/GameRail.jsx";
import SideNav from "../components/SideNav.jsx";
import { fetchGames } from "../services/api.js";

function HomePage({ query }) {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGames()
      .then(setGames)
      .finally(() => setIsLoading(false));
  }, []);

  const visibleGames = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return games;
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

  const continueGames = visibleGames.slice(4, 5);
  const recommendedGames = visibleGames.slice(4, 14);
  const featuredGames = visibleGames.slice(0, 10);
  const hasCategory = (game, categories) => {
    const gameCategories = game.categories || [game.category];
    return gameCategories.some((category) => categories.includes(category));
  };
  const puzzleGames = visibleGames.filter((game) =>
    hasCategory(game, ["Puzzle", "Match-3", "Mahjong & Connect", "Bubble Shooter", "Merge"])
  );
  const adventureGames = visibleGames.filter((game) =>
    hasCategory(game, ["Adventure", "Strategy", ".IO"])
  );
  const actionGames = visibleGames.filter((game) =>
    hasCategory(game, ["Action", "Racing", "Racing & Driving", "Sports", "Shooter", "Agility", "Simulation"])
  );

  return (
    <div className="portal-layout">
      <SideNav />
      <div className="page home-page">
        {isLoading ? (
          <p className="empty-state">Carregando jogos...</p>
        ) : query.trim() ? (
          <>
            <div className="section-title">
              <h1>Resultados para "{query}"</h1>
              <p>{visibleGames.length} jogos encontrados</p>
            </div>
            <GameGrid games={visibleGames} />
          </>
        ) : (
          <>
            <GameRail title="Continuar jogando" games={continueGames} size="small" />
            <GameRail
              title="As melhores opcoes para voce"
              games={recommendedGames}
              size="wide"
            />
            <GameRail id="featured" title="Jogos em destaque" games={featuredGames} size="wide" />
            <GameRail
              title="Suba no Ranking"
              subtitle="Compete com outros jogadores e chega ao topo."
              games={[...actionGames, ...featuredGames].slice(0, 8)}
              tone="ranking"
              size="wide"
            />
            <GameRail
              title="Treine seu cerebro"
              subtitle="Quebra-cabecas, enigmas e desafios rapidos para jogar agora."
              games={puzzleGames}
              tone="brain"
              size="wide"
            />
            <GameRail
              title="Adrenalina"
              subtitle="Jogos com aventura, velocidade e reflexos."
              games={[...adventureGames, ...actionGames]}
              tone="adrenaline"
              size="wide"
            />
            <section id="games" className="all-games-section">
              <div className="section-title">
                <h2>Todos os jogos</h2>
                <p>Catalogo inicial para validar embeds HTML5/WebGL.</p>
              </div>
              <GameGrid games={visibleGames} />
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
