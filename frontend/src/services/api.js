import { fallbackGames } from "../data/games";

const GAMEPIX_FEED_URL =
  "https://feeds.gamepix.com/v2/json?sid=6A8M0&pagination=24&page=";
const GAMEPIX_PAGES_TO_LOAD = 3;

function normalizeCategory(category) {
  return String(category || "Casual")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function normalizeGamePixGame(item, index, page) {
  const category = normalizeCategory(item.category);

  return {
    id: `gamepix-${item.id || item.namespace || `${page}-${index}`}`,
    provider: "gamepix",
    providerGameId: item.id,
    title: item.title,
    slug: item.namespace,
    description: item.description || "Jogo HTML5 da GamePix.",
    category,
    categories: [category],
    tags: [item.category, item.orientation].filter(Boolean),
    thumbnail: item.banner_image || item.image,
    icon: item.image,
    gameUrl: item.url,
    width: item.width || 800,
    height: item.height || 600,
    orientation: item.orientation,
    qualityScore: item.quality_score,
    dateModified: item.date_modified,
    datePublished: item.date_published
  };
}

async function fetchGamePixPage(page) {
  const response = await fetch(`${GAMEPIX_FEED_URL}${page}`);

  if (!response.ok) {
    throw new Error("Falha ao carregar feed da GamePix.");
  }

  const feed = await response.json();
  return (feed.items || []).map((item, index) => normalizeGamePixGame(item, index, page));
}

async function fetchGamePixGames() {
  const pages = Array.from({ length: GAMEPIX_PAGES_TO_LOAD }, (_, index) => index + 1);
  const results = await Promise.all(pages.map(fetchGamePixPage));

  return results.flat();
}

export async function fetchGames() {
  try {
    const gamePixGames = await fetchGamePixGames();
    return gamePixGames.length ? gamePixGames : fallbackGames;
  } catch (error) {
    console.warn(error.message);
    return fallbackGames;
  }
}

export async function fetchGameBySlug(slug) {
  const games = await fetchGames();
  return games.find((game) => game.slug === slug);
}

export async function searchGames(query) {
  const normalizedQuery = query.trim().toLowerCase();

  return fallbackGames.filter((game) => {
    const categories = game.categories || [game.category];
    const tags = game.tags || [];

    return (
      game.title.toLowerCase().includes(normalizedQuery) ||
      game.category.toLowerCase().includes(normalizedQuery) ||
      game.description.toLowerCase().includes(normalizedQuery) ||
      categories.some((category) => category.toLowerCase().includes(normalizedQuery)) ||
      tags.some((tag) => tag.toLowerCase().includes(normalizedQuery))
    );
  });
}
