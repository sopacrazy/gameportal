const games = require("../data/games");

function getAllGames() {
  return games;
}

function getGameBySlug(slug) {
  return games.find((game) => game.slug === slug);
}

function getCategories() {
  return [
    ...new Set(games.flatMap((game) => game.categories || [game.category]))
  ].sort();
}

function searchGames(query) {
  const normalizedQuery = String(query || "").trim().toLowerCase();

  if (!normalizedQuery) {
    return games;
  }

  return games.filter((game) => {
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

function getRelatedGames(currentSlug, category) {
  const currentGame = getGameBySlug(currentSlug);
  const currentCategories = currentGame?.categories || [category];

  return games
    .filter((game) => {
      if (game.slug === currentSlug) {
        return false;
      }

      const categories = game.categories || [game.category];
      return categories.some((item) => currentCategories.includes(item));
    })
    .slice(0, 4);
}

module.exports = {
  getAllGames,
  getGameBySlug,
  getCategories,
  searchGames,
  getRelatedGames
};
