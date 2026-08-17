import { ChevronRight } from "lucide-react";
import GameCard from "./GameCard.jsx";

function FeaturedGameMosaic({ title, games }) {
  if (!games.length) {
    return null;
  }

  const [heroGame, ...otherGames] = games;

  return (
    <section className="featured-mosaic-section">
      <div className="rail-heading">
        <div>
          <h2>{title}</h2>
        </div>
        <ChevronRight size={28} />
      </div>

      <div className="featured-mosaic">
        <GameCard game={heroGame} size="medium" badge="top" />
        {otherGames.slice(0, 5).map((game, index) => (
          <GameCard
            key={game.id}
            game={game}
            size="medium"
            badge={index === 2 ? "hot" : index % 2 === 0 ? "top" : undefined}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturedGameMosaic;
