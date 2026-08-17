import { Link } from "react-router-dom";
import { Flame, Star } from "lucide-react";

function GameCard({ game, size = "medium", badge, priority = false }) {
  return (
    <Link to={`/game/${game.slug}`} className={`game-card game-card-${size}`}>
      <img
        src={game.thumbnail}
        alt={game.title}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
      />
      {badge && (
        <span className={`game-badge badge-${badge}`}>
          {badge === "hot" ? <Flame size={15} /> : <Star size={15} />}
          {badge === "hot" ? "Hot" : "Top"}
        </span>
      )}
      <div className="game-card-content">
        <span>{game.category}</span>
        <h3>{game.title}</h3>
      </div>
    </Link>
  );
}

export default GameCard;
