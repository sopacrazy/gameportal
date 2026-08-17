import { ChevronRight } from "lucide-react";
import { useRef } from "react";
import GameCard from "./GameCard.jsx";

function GameRail({ id, title, subtitle, games, tone = "plain", size = "wide", onOpen }) {
  const stripRef = useRef(null);

  if (!games.length) {
    return null;
  }

  function scrollNext() {
    stripRef.current?.scrollBy({
      left: Math.round(stripRef.current.clientWidth * 0.82),
      behavior: "smooth"
    });
  }

  return (
    <section id={id} className={`game-rail rail-${tone}`}>
      <button
        type="button"
        className="rail-heading rail-heading-button"
        onClick={onOpen}
        disabled={!onOpen}
      >
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
        <ChevronRight size={28} />
      </button>
      <div className="rail-frame">
      <div className="rail-strip" ref={stripRef}>
        {games.map((game, index) => (
          <GameCard
            key={game.id}
            game={game}
            size={size}
            badge={index % 5 === 0 ? "top" : index % 4 === 0 ? "hot" : undefined}
          />
        ))}
      </div>
        {games.length > 4 && (
          <button type="button" className="rail-next-button" onClick={scrollNext} aria-label={`Avancar ${title}`}>
            <ChevronRight size={30} />
          </button>
        )}
      </div>
    </section>
  );
}

export default GameRail;
