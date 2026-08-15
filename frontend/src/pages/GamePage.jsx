import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CalendarDays,
  ExternalLink,
  Maximize2,
  MonitorSmartphone,
  Share2,
  Star,
  Tag,
  Trophy,
  Users,
  ArrowUp
} from "lucide-react";
import GameCard from "../components/GameCard.jsx";
import SideNav from "../components/SideNav.jsx";
import { fetchGameBySlug, fetchGames } from "../services/api.js";

function formatDate(value) {
  if (!value) {
    return "Nao informado";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Nao informado";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric"
  }).format(date);
}

function formatQuality(score) {
  if (typeof score !== "number") {
    return "8,0";
  }

  return (Math.max(0, Math.min(score, 1)) * 10).toFixed(1).replace(".", ",");
}

function GamePage() {
  const { slug } = useParams();
  const iframeRef = useRef(null);
  const playerRef = useRef(null);
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

  const sidebarGames = useMemo(() => {
    if (!game) {
      return [];
    }

    return allGames
      .filter((item) => item.slug !== game.slug)
      .sort((a, b) => {
        const aSameCategory = a.category === game.category ? 1 : 0;
        const bSameCategory = b.category === game.category ? 1 : 0;
        return bSameCategory - aSameCategory;
      })
      .slice(0, 24);
  }, [allGames, game]);

  const relatedGames = sidebarGames.slice(0, 8);
  const publishedDate = formatDate(game?.datePublished);
  const modifiedDate = formatDate(game?.dateModified);
  const quality = formatQuality(game?.qualityScore);

  function openFullscreen() {
    iframeRef.current?.requestFullscreen?.();
  }

  function scrollToPlayer() {
    playerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function getEmbedUrl(selectedGame) {
    return selectedGame.gameUrl;
  }

  if (isLoading) {
    return (
      <div className="portal-layout">
        <SideNav />
        <p className="empty-state game-loading">Carregando jogo...</p>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="portal-layout">
        <SideNav />
        <div className="page game-page">
        <p className="empty-state">Jogo nao encontrado.</p>
        <Link to="/" className="back-link">Voltar</Link>
        </div>
      </div>
    );
  }

  const hasConfiguredUrl = game.gameUrl && game.gameUrl !== "URL_DO_JOGO_AQUI";
  const embedUrl = hasConfiguredUrl ? getEmbedUrl(game) : "";
  const tags = [
    game.category,
    ...(game.tags || []),
    game.orientation,
    "HTML5",
    "Gratis"
  ]
    .filter(Boolean)
    .map((tag) => String(tag))
    .filter((tag, index, list) => list.indexOf(tag) === index)
    .slice(0, 10);

  return (
    <div className="portal-layout">
      <SideNav />
      <div className="page game-page">
        <section className="game-detail-layout">
          <div className="game-detail-main">
            <article className="game-player-shell" ref={playerRef}>
              <div className="game-player">
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
              </div>

            <div className="game-action-bar">
              <div className="game-title-chip">
                {game.icon && <img src={game.icon} alt="" />}
                <strong>{game.title}</strong>
              </div>
              <button type="button" className="invite-button">
                <Users size={18} />
                Convidar amigos
              </button>
              <button type="button" className="player-action">
                <Star size={18} />
                {quality}
              </button>
              <button type="button" className="player-action" aria-label="Compartilhar">
                <Share2 size={18} />
              </button>
              <button type="button" className="player-action" onClick={openFullscreen} aria-label="Tela cheia">
                <Maximize2 size={18} />
              </button>
            </div>
            </article>

          <section className="game-info-panel">
            <div className="breadcrumbs">
              <Link to="/">Jogos</Link>
              <span>/</span>
              <span>{game.category}</span>
              <span>/</span>
              <strong>{game.title}</strong>
            </div>

            <div className="game-info-grid">
              <div>
                <h1>{game.title}</h1>
                <button type="button" className="share-button">
                  <Share2 size={18} />
                  Compartilhar
                </button>

                <dl className="game-facts">
                  <div>
                    <dt>Desenvolvedor:</dt>
                    <dd>GamePix</dd>
                  </div>
                  <div>
                    <dt>Classificacao:</dt>
                    <dd>{quality} <small>(qualidade do catalogo)</small></dd>
                  </div>
                  <div>
                    <dt>Lancado:</dt>
                    <dd>{publishedDate}</dd>
                  </div>
                  <div>
                    <dt>Ultima atualizacao:</dt>
                    <dd>{modifiedDate}</dd>
                  </div>
                  <div>
                    <dt>Motor de jogo:</dt>
                    <dd>Externally hosted (iframe)</dd>
                  </div>
                  <div>
                    <dt>Plataforma:</dt>
                    <dd>Navegador (computador, celular, tablet)</dd>
                  </div>
                  <div>
                    <dt>Orientacao:</dt>
                    <dd>{game.orientation || "Panorama"}</dd>
                  </div>
                </dl>

                <div className="game-tags">
                  {tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>

              <div className="game-meta-card">
                <div>
                  <MonitorSmartphone size={22} />
                  <span>{game.width} x {game.height}</span>
                </div>
                <div>
                  <Tag size={22} />
                  <span>{game.category}</span>
                </div>
                <div>
                  <CalendarDays size={22} />
                  <span>{modifiedDate}</span>
                </div>
                <a href={game.gameUrl} target="_blank" rel="noreferrer">
                  <ExternalLink size={20} />
                  Abrir original
                </a>
              </div>
            </div>
          </section>

          <section className="game-copy-panel">
            <p>{game.description}</p>

            <h2>Como jogar</h2>
            <p>
              Clique no player acima e aguarde o carregamento. Cada jogo pode ter
              comandos proprios, mas a maioria funciona com mouse, toque na tela
              ou teclado.
            </p>

            <h2>Modos de jogo principais</h2>
            <p>
              Explore a categoria {game.category} e descubra fases, desafios e
              objetivos diferentes conforme o jogo escolhido.
            </p>

            <h2>Mais jogos como este</h2>
            <p>
              Se voce gostou de {game.title}, veja tambem outros jogos da mesma
              categoria na lista ao lado e nos relacionados abaixo.
            </p>

            <h2>Controles</h2>
            <ul>
              <li>Mouse ou toque = selecionar e interagir</li>
              <li>Setas ou WASD = mover quando o jogo permitir</li>
              <li>Espaco = acao principal em alguns jogos</li>
              <li>Tela cheia = jogar com mais conforto</li>
            </ul>
          </section>

          <section className="related-section">
            <div className="section-title">
              <Trophy size={30} />
              <h2>Jogos relacionados</h2>
            </div>
            <div className="related-strip">
              {relatedGames.map((item, index) => (
                <GameCard
                  key={item.id}
                  game={item}
                  size="wide"
                  badge={index % 5 === 0 ? "hot" : index % 2 === 0 ? "top" : undefined}
                />
              ))}
            </div>
          </section>
        </div>

        <aside className="game-right-rail">
          <div className="ad-card">
            <span>Anuncio</span>
            <div>
              <strong>Publicidade</strong>
              <p>Espaco reservado para campanha.</p>
            </div>
          </div>

          <h2>Jogar a seguir</h2>
          <div className="next-games-grid">
            {sidebarGames.map((item, index) => (
              <GameCard
                key={item.id}
                game={item}
                size="wide"
                badge={index % 7 === 0 ? "hot" : index % 3 === 0 ? "top" : undefined}
              />
            ))}
          </div>
          </aside>
        </section>

        <button type="button" className="back-to-game" onClick={scrollToPlayer}>
          <ArrowUp size={20} />
          Voltar pro jogo
        </button>
      </div>
    </div>
  );
}

export default GamePage;
