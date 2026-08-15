import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import GameGrid from "../components/GameGrid.jsx";
import { fetchGameBySlug, fetchGames } from "../services/api.js";

function GamePage() {
  const { slug } = useParams();
  const iframeRef = useRef(null);
  const [game, setGame] = useState(null);
  const [allGames, setAllGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchGameBySlug(slug), fetchGames()])
      .then(([selectedGame, games]) => {
        setGame(selectedGame);
        setAllGames(games);
      })
      .finally(() => setIsLoading(false));
  }, [slug]);

  const relatedGames = useMemo(() => {
    if (!game) {
      return [];
    }

    if (game.relatedGames) {
      return game.relatedGames;
    }

    return allGames
      .filter((item) => item.slug !== game.slug && item.category === game.category)
      .slice(0, 4);
  }, [allGames, game]);

  function openFullscreen() {
    iframeRef.current?.requestFullscreen?.();
  }

  function getEmbedUrl(selectedGame) {
    return selectedGame.gameUrl;
  }

  if (isLoading) {
    return <p className="empty-state">Carregando jogo...</p>;
  }

  if (!game) {
    return (
      <div className="page">
        <p className="empty-state">Jogo nao encontrado.</p>
        <Link to="/" className="back-link">Voltar</Link>
      </div>
    );
  }

  const hasConfiguredUrl = game.gameUrl && game.gameUrl !== "URL_DO_JOGO_AQUI";
  const embedUrl = hasConfiguredUrl ? getEmbedUrl(game) : "";

  return (
    <div className="page game-page">
      <div className="game-toolbar">
        <Link to="/" className="back-link">Voltar</Link>
        <button type="button" onClick={openFullscreen}>Tela cheia</button>
      </div>

      <section className="game-layout">
        <article className="game-player">
          <div className="player-header">
            <div>
              <span>{game.category}</span>
              <h1>{game.title}</h1>
            </div>
            <small>{game.width} x {game.height}</small>
          </div>

          {hasConfiguredUrl ? (
            <iframe
              ref={iframeRef}
              src={embedUrl}
              title={game.title}
              allow="fullscreen; autoplay"
              allowFullScreen
            />
          ) : (
            <div className="iframe-placeholder">
              <strong>URL do jogo ainda nao configurada.</strong>
              <p>
                Verifique o campo gameUrl no feed ou no fallback local do frontend.
              </p>
            </div>
          )}
        </article>

        <aside className="ad-slot">
          <span>Publicidade</span>
          <p>Area reservada para anuncios futuros.</p>
        </aside>
      </section>

      <section>
        <h2>Jogos relacionados</h2>
        <GameGrid games={relatedGames} />
      </section>
    </div>
  );
}

export default GamePage;
