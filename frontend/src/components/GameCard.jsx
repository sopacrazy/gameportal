import { Link } from "react-router-dom";
import { Flame, Star } from "lucide-react";
import { useI18n } from "../i18n.jsx";

function GameCard({ game, size = "medium", badge, priority = false }) {
  const { t, tCategory } = useI18n();

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
          {badge === "hot" ? t("card.hot") : t("card.top")}
        </span>
      )}
      <div className="game-card-content">
        <span>{tCategory(game.category)}</span>
        <h3>{game.title}</h3>
      </div>
    </Link>
  );
}

export default GameCard;
