import GameCard from "./GameCard.jsx";

function GameGrid({ games }) {
  if (!games.length) {
    return <p className="empty-state">Nenhum jogo encontrado.</p>;
  }

  return (
    <section id="games" className="game-grid">
      {games.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </section>
  );
}

export default GameGrid;
