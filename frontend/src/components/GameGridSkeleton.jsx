function GameGridSkeleton({ count = 12 }) {
  return (
    <section className="game-grid skeleton-grid" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <div className="game-card game-card-medium skeleton-card" key={index}>
          <span />
          <strong />
        </div>
      ))}
    </section>
  );
}

export default GameGridSkeleton;
