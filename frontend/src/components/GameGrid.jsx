import GameCard from "./GameCard.jsx";
import { useI18n } from "../i18n.jsx";

function GameGrid({ games, priorityCount = 24 }) {
  const { t } = useI18n();

  if (!games.length) {
    return <p className="empty-state">{t("app.noGames")}</p>;
  }

  return (
    <section id="games" className="game-grid">
      {games.map((game, index) => (
        <GameCard key={game.id} game={game} priority={index < priorityCount} />
      ))}
    </section>
  );
}

export default GameGrid;
