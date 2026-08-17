import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import FeaturedGameMosaic from "../components/FeaturedGameMosaic.jsx";
import GameGrid from "../components/GameGrid.jsx";
import GameRail from "../components/GameRail.jsx";
import SideNav, { navItems } from "../components/SideNav.jsx";
import { fetchGames } from "../services/api.js";

const PLAYED_GAMES_KEY = "gameportal.playedGames";
const INITIAL_VISIBLE_GAMES = 24;
const LOAD_MORE_BATCH = 24;
const PAGE_STEP = 3;
const MAX_FEED_PAGES = 24;
const SPECIAL_FILTERS = {
  ranking: ["Action", "Sports", "Racing", "Racing & Driving", "Shooter", "Arcade"],
  brain: ["Puzzle", "Quiz", "Trivia", "Word", "Words", "Board", "Strategy", "Mahjong & Connect"],
  adrenaline: ["Action", "Adventure", "Racing", "Racing & Driving", "Shooter", "Sports"]
};

function readPlayedGames() {
  try {
    return JSON.parse(localStorage.getItem(PLAYED_GAMES_KEY) || "[]");
  } catch {
    return [];
  }
}

function HomePage({ query, resetSignal, isMobileMenuOpen, onMobileMenuClose }) {
  const location = useLocation();
  const loadMoreRef = useRef(null);
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [feedPages, setFeedPages] = useState(3);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_GAMES);
  const [activeFilter, setActiveFilter] = useState("home");
  const [activeFilterLabel, setActiveFilterLabel] = useState("Pagina Inicial");
  const [activeFilterCategories, setActiveFilterCategories] = useState([]);
  const [playedSlugs, setPlayedSlugs] = useState([]);

  useEffect(() => {
    const loadingState = games.length ? setIsLoadingMore : setIsLoading;

    loadingState(true);
    fetchGames(feedPages)
      .then(setGames)
      .finally(() => loadingState(false));
  }, [feedPages]);

  useEffect(() => {
    setPlayedSlugs(readPlayedGames());
  }, []);

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_GAMES);
  }, [query, activeFilter]);

  useEffect(() => {
    if (!resetSignal) {
      return;
    }

    setActiveFilter("home");
    setActiveFilterLabel("Pagina Inicial");
    setActiveFilterCategories([]);
    setVisibleCount(INITIAL_VISIBLE_GAMES);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });
  }, [resetSignal]);

  const filterLabel = useMemo(() => {
    if (activeFilter === "all") {
      return "Todos os jogos";
    }

    if (activeFilter === "new") {
      return "Novos jogos";
    }

    if (activeFilter === "recent") {
      return "Recentes";
    }

    if (activeFilter === "trending") {
      return "Trending";
    }

    if (activeFilter === "ranking") {
      return "Suba no Ranking";
    }

    if (activeFilter === "brain") {
      return "Treine seu cerebro";
    }

    if (activeFilter === "adrenaline") {
      return "Adrenalina";
    }

    return activeFilterLabel;
  }, [activeFilter, activeFilterLabel]);

  const visibleGames = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filterCategories = SPECIAL_FILTERS[activeFilter] || activeFilterCategories;
    const normalizedFilterCategories = filterCategories.map((category) => category.toLowerCase());

    const filteredGames = games.filter((game) => {
      const categories = game.categories || [game.category];
      const tags = game.tags || [];
      const searchableCategories = [game.category, ...categories, ...tags]
        .filter(Boolean)
        .map((category) => String(category).toLowerCase());
      const searchMatches =
        !normalizedQuery ||
        game.title.toLowerCase().includes(normalizedQuery) ||
        game.category.toLowerCase().includes(normalizedQuery) ||
        game.description.toLowerCase().includes(normalizedQuery) ||
        categories.some((category) => category.toLowerCase().includes(normalizedQuery)) ||
        tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

      if (!searchMatches) {
        return false;
      }

      if (["home", "all", "recent", "new", "trending", "featured", "tags", "search"].includes(activeFilter)) {
        return true;
      }

      return searchableCategories.some((category) =>
        normalizedFilterCategories.some((filterCategory) => category === filterCategory)
      );
    });

    if (activeFilter === "new" || activeFilter === "recent") {
      return [...filteredGames].sort((a, b) => new Date(b.datePublished || 0) - new Date(a.datePublished || 0));
    }

    if (activeFilter === "trending" || activeFilter === "featured") {
      return [...filteredGames].sort((a, b) => (b.qualityScore || 0) - (a.qualityScore || 0));
    }

    return filteredGames;
  }, [activeFilter, activeFilterCategories, games, query]);

  const continueGames = useMemo(() => {
    return playedSlugs
      .map((slug) => games.find((game) => game.slug === slug))
      .filter(Boolean)
      .slice(0, 8);
  }, [games, playedSlugs]);

  const recommendedGames = visibleGames.slice(6, 18);
  const featuredGames = visibleGames.slice(0, 10);
  const allGamesToShow = visibleGames.slice(0, visibleCount);
  const canShowMoreLocal = visibleCount < visibleGames.length;
  const hasMoreFeedPages = feedPages < MAX_FEED_PAGES;
  const loadStatusText = isLoadingMore
    ? "Carregando mais jogos..."
    : canShowMoreLocal || hasMoreFeedPages
      ? "Continue rolando para ver mais"
      : "Todos os jogos desta categoria foram carregados";
  const hasCategory = (game, categories) => {
    const gameCategories = game.categories || [game.category];
    return gameCategories.some((category) => categories.includes(category));
  };
  const puzzleGames = visibleGames.filter((game) =>
    hasCategory(game, ["Puzzle", "Match-3", "Mahjong & Connect", "Bubble Shooter", "Merge"])
  );
  const adventureGames = visibleGames.filter((game) =>
    hasCategory(game, ["Adventure", "Strategy", ".IO"])
  );
  const actionGames = visibleGames.filter((game) =>
    hasCategory(game, ["Action", "Racing", "Racing & Driving", "Sports", "Shooter", "Agility", "Simulation"])
  );

  function openFilteredSection(filter, label, categories = []) {
    setActiveFilter(filter);
    setActiveFilterLabel(label);
    setActiveFilterCategories(categories);

    const target = filter === "home" ? "featured" : "games";
    requestAnimationFrame(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  function handleFilterSelect(item) {
    openFilteredSection(item.key || item.action || "home", item.label, item.categories || []);
  }

  useEffect(() => {
    const hashFilter = location.hash.replace("#", "");

    if (!hashFilter) {
      return;
    }

    if (hashFilter === "continue") {
      requestAnimationFrame(() => {
        document.getElementById("continue")?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
      return;
    }

    const item = navItems.find((navItem) => (navItem.key || navItem.action) === hashFilter);

    if (item) {
      openFilteredSection(item.key || item.action || "home", item.label, item.categories || []);
    }
  }, [location.hash]);

  function handleLoadMore() {
    if (isLoadingMore || feedPages >= MAX_FEED_PAGES) {
      return;
    }

    if (canShowMoreLocal) {
      setVisibleCount((count) => count + LOAD_MORE_BATCH);
      return;
    }

    setFeedPages((count) => Math.min(count + PAGE_STEP, MAX_FEED_PAGES));
  }

  useEffect(() => {
    const shouldPrefillCategory =
      activeFilter !== "home" &&
      !query.trim() &&
      !isLoading &&
      !isLoadingMore &&
      visibleGames.length < INITIAL_VISIBLE_GAMES &&
      feedPages < MAX_FEED_PAGES;

    if (shouldPrefillCategory) {
      setFeedPages((count) => Math.min(count + PAGE_STEP, MAX_FEED_PAGES));
    }
  }, [activeFilter, feedPages, isLoading, isLoadingMore, query, visibleGames.length]);

  useEffect(() => {
    const marker = loadMoreRef.current;

    if (!marker || isLoading || query.trim()) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          handleLoadMore();
        }
      },
      {
        rootMargin: "700px 0px 700px 0px"
      }
    );

    observer.observe(marker);

    return () => observer.disconnect();
  }, [canShowMoreLocal, isLoading, isLoadingMore, query, visibleGames.length]);

  useEffect(() => {
    if (isLoading || isLoadingMore || query.trim() || feedPages >= MAX_FEED_PAGES) {
      return undefined;
    }

    function loadWhenNearBottom() {
      const distanceToBottom =
        document.documentElement.scrollHeight - window.scrollY - window.innerHeight;

      if (distanceToBottom < 900) {
        handleLoadMore();
      }
    }

    window.addEventListener("scroll", loadWhenNearBottom, { passive: true });
    loadWhenNearBottom();

    return () => window.removeEventListener("scroll", loadWhenNearBottom);
  }, [canShowMoreLocal, feedPages, isLoading, isLoadingMore, query, visibleGames.length]);

  return (
    <div className="portal-layout">
      <SideNav
        activeFilter={activeFilter}
        isOpen={isMobileMenuOpen}
        onFilterSelect={handleFilterSelect}
        onClose={onMobileMenuClose}
      />
      <div className="page home-page">
        {isLoading ? (
          <p className="empty-state">Carregando jogos...</p>
        ) : query.trim() ? (
          <>
            <div className="section-title">
              <h1>Resultados para "{query}"</h1>
              <p>{visibleGames.length} jogos encontrados</p>
            </div>
            <GameGrid games={visibleGames} />
          </>
        ) : activeFilter !== "home" ? (
          <section id="games" className="all-games-section">
            <div className="section-title">
              <div>
                <h1>{filterLabel}</h1>
                <p>{visibleGames.length} jogos encontrados</p>
              </div>
            </div>
            <GameGrid games={allGamesToShow} />
            <div ref={loadMoreRef} className="infinite-load-status">
              {loadStatusText}
            </div>
          </section>
        ) : (
          <>
            <GameRail id="continue" title="Continuar jogando" games={continueGames} size="small" />
            <FeaturedGameMosaic
              title="As melhores opcoes para voce"
              games={recommendedGames}
            />
            <GameRail id="featured" title="Jogos em destaque" games={featuredGames} size="wide" />
            <GameRail
              title="Suba no Ranking"
              subtitle="Compete com outros jogadores e chega ao topo."
              games={[...actionGames, ...featuredGames].slice(0, 8)}
              tone="ranking"
              size="wide"
              onOpen={() => openFilteredSection("ranking", "Suba no Ranking")}
            />
            <GameRail
              title="Treine seu cerebro"
              subtitle="Quebra-cabecas, enigmas e desafios rapidos para jogar agora."
              games={puzzleGames}
              tone="brain"
              size="wide"
              onOpen={() => openFilteredSection("brain", "Treine seu cerebro")}
            />
            <GameRail
              title="Adrenalina"
              subtitle="Jogos com aventura, velocidade e reflexos."
              games={[...adventureGames, ...actionGames]}
              tone="adrenaline"
              size="wide"
              onOpen={() => openFilteredSection("adrenaline", "Adrenalina")}
            />
            <section id="games" className="all-games-section">
              <div className="section-title">
                <h2>Todos os jogos</h2>
                <p>{visibleGames.length} jogos carregados no portal.</p>
              </div>
              <GameGrid games={allGamesToShow} />
              <div ref={loadMoreRef} className="infinite-load-status">
                {loadStatusText}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;
