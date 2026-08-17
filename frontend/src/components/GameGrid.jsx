import GameCard from "./GameCard.jsx";

function GameGrid({ games, priorityCount = 24 }) {
  if (!games.length) {
    return <p className="empty-state">Nenhum jogo encontrado.</p>;
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
