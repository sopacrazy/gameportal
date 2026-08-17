import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CalendarDays,
  ExternalLink,
  Maximize2,
  MonitorSmartphone,
  Play,
  Share2,
  Star,
  Tag,
  Trophy,
  Users,
  X
} from "lucide-react";
import AdSlot from "../components/AdSlot.jsx";
import GameCard from "../components/GameCard.jsx";
import SideNav from "../components/SideNav.jsx";
import { useI18n } from "../i18n.jsx";
import { fetchGameBySlug, fetchGames, getGameDescription } from "../services/api.js";

const PLAYED_GAMES_KEY = "pitugames.playedGames";

function formatDate(value, locale, fallback) {
  if (!value) {
    return fallback;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return fallback;
  }

  return new Intl.DateTimeFormat(locale, {
    month: "long",
    year: "numeric"
  }).format(date);
}

function GamePage({ isMobileMenuOpen, onMobileMenuClose }) {
  const { formatScore, locale, t, tCategory } = useI18n();
  const { slug } = useParams();
  const iframeRef = useRef(null);
  const playerShellRef = useRef(null);
  const [game, setGame] = useState(null);
  const [allGames, setAllGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlayerFullscreen, setIsPlayerFullscreen] = useState(false);
  const [isMobilePlaying, setIsMobilePlaying] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    setIsLoading(true);
    setGame(null);
    setAllGames([]);
    setIsMobilePlaying(false);

    fetchGameBySlug(slug)
      .then((selectedGame) => {
        if (!isCancelled) {
          setGame(selectedGame);
        }
      })
      .finally(() => {
        if (!isCancelled) {
          setIsLoading(false);
        }
      });

    fetchGames()
      .then((games) => {
        if (!isCancelled) {
          setAllGames(games);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [slug]);

  useEffect(() => {
    if (!isMobilePlaying) {
      return undefined;
    }

    document.body.classList.add("game-fullscreen-lock");

    return () => document.body.classList.remove("game-fullscreen-lock");
  }, [isMobilePlaying]);

  useEffect(() => {
    if (!game?.slug) {
      return;
    }

    try {
      const previousSlugs = JSON.parse(localStorage.getItem(PLAYED_GAMES_KEY) || "[]");
      const nextSlugs = [game.slug, ...previousSlugs.filter((item) => item !== game.slug)].slice(0, 12);
      localStorage.setItem(PLAYED_GAMES_KEY, JSON.stringify(nextSlugs));
    } catch {
      localStorage.setItem(PLAYED_GAMES_KEY, JSON.stringify([game.slug]));
    }
  }, [game]);

  useEffect(() => {
    function handleFullscreenChange() {
      const isFullscreen = document.fullscreenElement === playerShellRef.current;
      setIsPlayerFullscreen(isFullscreen);
      if (!isFullscreen) {
        setIsMobilePlaying(false);
      }
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

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
  const gameDescription = game ? getGameDescription(game, locale) : "";
  const publishedDate = formatDate(game?.datePublished, locale, t("app.notInformed"));
  const modifiedDate = formatDate(game?.dateModified, locale, t("app.notInformed"));
  const quality = formatScore(game?.qualityScore);

  async function openFullscreen() {
    try {
      await playerShellRef.current?.requestFullscreen?.();
    } catch {
      setIsPlayerFullscreen(false);
    }
    requestAnimationFrame(() => iframeRef.current?.focus());
  }

  function startMobileGame() {
    setIsMobilePlaying(true);
    openFullscreen();
  }

  function exitFullscreen() {
    setIsMobilePlaying(false);
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  }

  function getEmbedUrl(selectedGame) {
    return selectedGame.gameUrl;
  }

  if (isLoading) {
    return (
      <div className="portal-layout">
        <SideNav isOpen={isMobileMenuOpen} onClose={onMobileMenuClose} />
        <div className="page game-page">
          <section className="game-loading-card" aria-live="polite">
            <div className="game-loading-art" />
            <div className="game-loading-copy">
              <span>{t("game.loadingPrep")}</span>
              <h1>{t("game.loadingTitle")}</h1>
              <p>{t("game.loadingText")}</p>
              <div className="game-loading-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="portal-layout">
        <SideNav isOpen={isMobileMenuOpen} onClose={onMobileMenuClose} />
        <div className="page game-page">
        <p className="empty-state">{t("game.notFound")}</p>
        <Link to="/" className="back-link">{t("game.back")}</Link>
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
    t("game.free")
  ]
    .filter(Boolean)
    .map((tag) => String(tag))
    .filter((tag, index, list) => list.indexOf(tag) === index)
    .slice(0, 10);

  return (
    <div className="portal-layout">
      <SideNav isOpen={isMobileMenuOpen} onClose={onMobileMenuClose} />
      <div className="page game-page">
        <section className="game-detail-layout">
          <div className="game-detail-main">
            <section className="mobile-game-launch">
              <img src={game.thumbnail} alt={game.title} />
              <div className="mobile-game-launch-copy">
                <span>{tCategory(game.category)}</span>
                <h1>{game.title}</h1>
                <p>{gameDescription}</p>
              </div>
              <button type="button" className="mobile-play-main" onClick={startMobileGame}>
                <Play size={20} />
                {t("game.play")}
              </button>
            </section>

            <article
              className={`game-player-shell ${isMobilePlaying ? "mobile-playing" : ""}`}
              ref={playerShellRef}
            >
              <div className="game-player">
                {isMobilePlaying && (
                  <button
                    type="button"
                    className="mobile-game-exit-button"
                    onClick={exitFullscreen}
                    aria-label={t("game.exitGame")}
                  >
                    <X size={18} />
                  </button>
                )}
                {hasConfiguredUrl ? (
                  <iframe
                    ref={iframeRef}
                    src={embedUrl}
                    title={game.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gamepad; gyroscope; payment; web-share"
                    allowFullScreen
                    tabIndex="0"
                  />
                ) : (
                  <div className="iframe-placeholder">
                    <strong>{t("game.noUrlTitle")}</strong>
                    <p>
                      {t("game.noUrlText")}
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
                {t("game.invite")}
              </button>
              <button type="button" className="player-action">
                <Star size={18} />
                {quality}
              </button>
              <button type="button" className="player-action" aria-label={t("game.share")}>
                <Share2 size={18} />
              </button>
              <button type="button" className="player-action" onClick={openFullscreen} aria-label={t("game.fullscreen")}>
                <Maximize2 size={18} />
              </button>
              {isPlayerFullscreen && (
                <button type="button" className="player-action mobile-exit-fullscreen" onClick={exitFullscreen}>
                  <X size={18} />
                  {t("game.exit")}
                </button>
              )}
            </div>
            </article>

          <section className="game-info-panel">
            <div className="breadcrumbs">
              <Link to="/">{t("game.games")}</Link>
              <span>/</span>
              <span>{tCategory(game.category)}</span>
              <span>/</span>
              <strong>{game.title}</strong>
            </div>

            <div className="game-info-grid">
              <div>
                <h1>{game.title}</h1>
                <button type="button" className="share-button">
                  <Share2 size={18} />
                  {t("game.share")}
                </button>

                <dl className="game-facts">
                  <div>
                    <dt>{t("game.developer")}</dt>
                    <dd>{game.providerName || game.provider || t("app.notInformed")}</dd>
                  </div>
                  <div>
                    <dt>{t("game.rating")}</dt>
                    <dd>{quality} <small>{t("game.catalogQuality")}</small></dd>
                  </div>
                  <div>
                    <dt>{t("game.released")}</dt>
                    <dd>{publishedDate}</dd>
                  </div>
                  <div>
                    <dt>{t("game.updated")}</dt>
                    <dd>{modifiedDate}</dd>
                  </div>
                  <div>
                    <dt>{t("game.engine")}</dt>
                    <dd>Externally hosted (iframe)</dd>
                  </div>
                  <div>
                    <dt>{t("game.platform")}</dt>
                    <dd>{t("game.platformValue")}</dd>
                  </div>
                  <div>
                    <dt>{t("game.orientation")}</dt>
                    <dd>{game.orientation || t("game.panorama")}</dd>
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
                  <span>{tCategory(game.category)}</span>
                </div>
                <div>
                  <CalendarDays size={22} />
                  <span>{modifiedDate}</span>
                </div>
                <a href={game.gameUrl} target="_blank" rel="noreferrer">
                  <ExternalLink size={20} />
                  {t("game.openOriginal")}
                </a>
              </div>
            </div>
          </section>

          <section className="game-copy-panel">
            <p>{gameDescription}</p>

            <h2>{t("game.howToPlay")}</h2>
            <p>{t("game.howToPlayText")}</p>

            <h2>{t("game.mainModes")}</h2>
            <p>{t("game.mainModesText", { category: tCategory(game.category) })}</p>

            <h2>{t("game.moreLikeThis")}</h2>
            <p>{t("game.moreLikeThisText", { title: game.title })}</p>

            <h2>{t("game.controls")}</h2>
            <ul>
              <li>{t("game.controlMouse")}</li>
              <li>{t("game.controlMove")}</li>
              <li>{t("game.controlAction")}</li>
              <li>{t("game.controlFullscreen")}</li>
            </ul>
          </section>

          <AdSlot variant="mobile" className="mobile-game-ad" />

          <section className="related-section">
            <div className="section-title">
              <Trophy size={30} />
              <h2>{t("game.related")}</h2>
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
          <AdSlot />

          <h2>{t("game.next")}</h2>
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

      </div>
    </div>
  );
}

export default GamePage;
