import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FeaturedGameMosaic from "../components/FeaturedGameMosaic.jsx";
import GameGrid from "../components/GameGrid.jsx";
import GameGridSkeleton from "../components/GameGridSkeleton.jsx";
import GameRail from "../components/GameRail.jsx";
import SideNav, { navItems } from "../components/SideNav.jsx";
import { useI18n } from "../i18n.jsx";
import { fetchGames, matchesGameSearch } from "../services/api.js";

const PLAYED_GAMES_KEY = "pitugames.playedGames";
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

function HomePage({ query, onClearSearch, resetSignal, isMobileMenuOpen, onMobileMenuClose }) {
  const { t } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const { filter: routeFilter } = useParams();
  const loadMoreRef = useRef(null);
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [feedPages, setFeedPages] = useState(3);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE_GAMES);
  const [activeFilter, setActiveFilter] = useState("home");
  const [activeFilterLabel, setActiveFilterLabel] = useState("nav.home");
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
    setActiveFilterLabel("nav.home");
    setActiveFilterCategories([]);
    setVisibleCount(INITIAL_VISIBLE_GAMES);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });
  }, [resetSignal]);

  const filterLabel = useMemo(() => {
    if (activeFilter === "all") {
      return t("home.allGames");
    }

    if (activeFilter === "new") {
      return t("nav.new");
    }

    if (activeFilter === "recent") {
      return t("nav.recent");
    }

    if (activeFilter === "trending") {
      return t("nav.trending");
    }

    if (activeFilter === "ranking") {
      return t("home.ranking");
    }

    if (activeFilter === "brain") {
      return t("home.brain");
    }

    if (activeFilter === "adrenaline") {
      return t("home.adrenaline");
    }

    return activeFilterLabel.includes(".") ? t(activeFilterLabel) : activeFilterLabel;
  }, [activeFilter, activeFilterLabel, t]);

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
      const searchMatches = !normalizedQuery || matchesGameSearch(game, normalizedQuery);

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
    ? t("home.loadingMore")
    : canShowMoreLocal || hasMoreFeedPages
      ? t("home.keepScrolling")
      : t("home.allLoaded");
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
    const target = item.key || item.action || "home";

    if (target === "search") {
      navigate("/search");
      return;
    }

    onClearSearch?.();
    navigate(target === "home" ? "/" : `/category/${target}`);
    openFilteredSection(target, item.labelKey || item.label, item.categories || []);
  }

  useEffect(() => {
    if (!routeFilter) {
      return;
    }

    const item = navItems.find((navItem) => (navItem.key || navItem.action) === routeFilter);

    if (item) {
      onClearSearch?.();
      setActiveFilter(item.key || item.action || "home");
      setActiveFilterLabel(item.labelKey || item.label);
      setActiveFilterCategories(item.categories || []);
      setVisibleCount(INITIAL_VISIBLE_GAMES);
    }
  }, [onClearSearch, routeFilter]);

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
      openFilteredSection(item.key || item.action || "home", item.labelKey || item.label, item.categories || []);
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
          <>
            <div className="section-title">
              <h1>{t("app.loadingGames")}</h1>
              <p>{t("game.loadingText")}</p>
            </div>
            <GameGridSkeleton />
          </>
        ) : query.trim() ? (
          <>
            <div className="section-title">
              <h1>{t("home.resultsFor", { query })}</h1>
              <p>{t("home.resultsFound", { count: visibleGames.length })}</p>
            </div>
            <GameGrid games={visibleGames} />
          </>
        ) : activeFilter !== "home" ? (
          <section id="games" className="all-games-section">
            <div className="section-title">
              <div>
                <h1>{filterLabel}</h1>
                <p>{t("home.resultsFound", { count: visibleGames.length })}</p>
              </div>
            </div>
            <GameGrid games={allGamesToShow} />
            <div ref={loadMoreRef} className="infinite-load-status">
              {loadStatusText}
            </div>
          </section>
        ) : (
          <>
            <GameRail id="continue" title={t("home.continuePlaying")} games={continueGames} size="small" />
            <FeaturedGameMosaic
              title={t("home.bestForYou")}
              games={recommendedGames}
            />
            <GameRail id="featured" title={t("home.featured")} games={featuredGames} size="wide" />
            <GameRail
              title={t("home.ranking")}
              subtitle={t("home.rankingSubtitle")}
              games={[...actionGames, ...featuredGames].slice(0, 8)}
              tone="ranking"
              size="wide"
              onOpen={() => openFilteredSection("ranking", "home.ranking")}
            />
            <GameRail
              title={t("home.brain")}
              subtitle={t("home.brainSubtitle")}
              games={puzzleGames}
              tone="brain"
              size="wide"
              onOpen={() => openFilteredSection("brain", "home.brain")}
            />
            <GameRail
              title={t("home.adrenaline")}
              subtitle={t("home.adrenalineSubtitle")}
              games={[...adventureGames, ...actionGames]}
              tone="adrenaline"
              size="wide"
              onOpen={() => openFilteredSection("adrenaline", "home.adrenaline")}
            />
            <section id="games" className="all-games-section">
              <div className="section-title">
                <h2>{t("home.allGames")}</h2>
                <p>{t("home.loadedCount", { count: visibleGames.length })}</p>
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
