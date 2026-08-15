import { ChevronRight } from "lucide-react";
import GameCard from "./GameCard.jsx";

function GameRail({ id, title, subtitle, games, tone = "plain", size = "wide" }) {
  if (!games.length) {
    return null;
  }

  return (
    <section id={id} className={`game-rail rail-${tone}`}>
      <div className="rail-heading">
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <ChevronRight size={28} />
      </div>
      <div className="rail-strip">
        {games.map((game, index) => (
          <GameCard
            key={game.id}
            game={game}
            size={size}
            badge={index % 5 === 0 ? "top" : index % 4 === 0 ? "hot" : undefined}
          />
        ))}
      </div>
    </section>
  );
}

export default GameRail;
