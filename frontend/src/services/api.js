import { fallbackGames } from "../data/games";

const GAMEPIX_FEED_URL =
  "https://feeds.gamepix.com/v2/json?sid=6A8M0&pagination=24&page=";
const GAMEPIX_PAGES_TO_LOAD = 3;
const FEED_TIMEOUT_MS = 7000;
const pageCache = new Map();

const CATEGORY_SEARCH_ALIASES = {
  Action: ["acao", "accion", "action", "battle", "combate"],
  Adventure: ["aventura", "adventure"],
  Arcade: ["arcade"],
  Board: ["tabuleiro", "mesa", "board"],
  Cards: ["cartas", "cards", "solitaire"],
  Driving: ["direcao", "conducao", "conduccion", "driving", "carro", "car"],
  Puzzle: ["quebra-cabeca", "quebra cabeca", "rompecabezas", "puzzle"],
  Racing: ["corrida", "corridas", "carreras", "racing", "race", "carro", "car"],
  Shooting: ["tiro", "disparo", "disparos", "shooter", "shooting", "arma"],
  Simulation: ["simulacao", "simulacion", "simulation", "simulator"],
  Sports: ["esporte", "esportes", "deporte", "deportes", "sports", "soccer", "football"],
  Strategy: ["estrategia", "strategy"],
  Survival: ["sobrevivencia", "supervivencia", "survival", "zumbi", "zombie"]
};

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
    providerName: "GamePix",
    providerGameId: item.id,
    title: item.title,
    slug: item.namespace,
    description: item.description || "Jogo online pronto para jogar.",
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
  if (pageCache.has(page)) {
    return pageCache.get(page);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FEED_TIMEOUT_MS);

  const pagePromise = fetch(`${GAMEPIX_FEED_URL}${page}`, {
    signal: controller.signal
  })
    .finally(() => clearTimeout(timeout))
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("Falha ao carregar feed da GamePix.");
      }

      const feed = await response.json();
      return (feed.items || []).map((item, index) => normalizeGamePixGame(item, index, page));
    })
    .catch((error) => {
      pageCache.delete(page);
      throw error;
    });

  pageCache.set(page, pagePromise);
  return pagePromise;
}

async function fetchGamePixGames(pageCount = GAMEPIX_PAGES_TO_LOAD) {
  const pages = Array.from({ length: pageCount }, (_, index) => index + 1);
  const results = await Promise.allSettled(pages.map(fetchGamePixPage));
  const games = results
    .filter((result) => result.status === "fulfilled")
    .flatMap((result) => result.value);

  if (!games.length) {
    throw new Error("Nenhuma pagina da GamePix carregou.");
  }

  return games;
}

export async function fetchGames(pageCount = GAMEPIX_PAGES_TO_LOAD) {
  try {
    const gamePixGames = await fetchGamePixGames(pageCount);
    return [...fallbackGames, ...gamePixGames];
  } catch (error) {
    console.warn(error.message);
    return fallbackGames;
  }
}

export async function fetchGameBySlug(slug) {
  const localGame = fallbackGames.find((game) => game.slug === slug);

  if (localGame) {
    return localGame;
  }

  const games = await fetchGames(8);
  return games.find((game) => game.slug === slug);
}

export async function searchGames(query) {
  const games = await fetchGames();
  return games.filter((game) => matchesGameSearch(game, query));
}

export function getGameDescription(game, locale = "pt-BR") {
  if (game.descriptionByLocale?.[locale]) {
    return game.descriptionByLocale[locale];
  }

  if (locale === "en" && game.descriptionByLocale?.en) {
    return game.descriptionByLocale.en;
  }

  if (locale === "es" && game.descriptionByLocale?.es) {
    return game.descriptionByLocale.es;
  }

  if (locale === "en" && game.provider === "gamemonetize") {
    return `Play ${game.title}, a free browser game in the ${game.category} category. Start instantly on desktop, phone or tablet.`;
  }

  if (locale === "es" && game.provider === "gamemonetize") {
    return `Juega ${game.title}, un juego gratis de navegador en la categoria ${game.category}. Empieza al instante en computadora, celular o tablet.`;
  }

  return game.description;
}

export function getGameSearchFields(game) {
  const categories = game.categories || [game.category];
  const tags = game.tags || [];
  const localizedDescriptions = Object.values(game.descriptionByLocale || {});
  const categoryAliases = [game.category, ...categories].flatMap((category) =>
    CATEGORY_SEARCH_ALIASES[category] || []
  );

  return [
    game.title,
    game.category,
    game.description,
    ...localizedDescriptions,
    ...categories,
    ...tags,
    ...categoryAliases
  ].filter(Boolean);
}

export function matchesGameSearch(game, query) {
  const normalizedQuery = query.trim().toLowerCase();

  if (!normalizedQuery) {
    return true;
  }

  return getGameSearchFields(game).some((field) =>
    String(field).toLowerCase().includes(normalizedQuery)
  );
}
