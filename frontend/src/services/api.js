import { fallbackGames } from "../data/games";

export async function fetchGames() {
  return fallbackGames;
}

export async function fetchGameBySlug(slug) {
  return fallbackGames.find((game) => game.slug === slug);
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
