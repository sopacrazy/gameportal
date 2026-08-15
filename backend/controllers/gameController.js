const {
  getAllGames,
  getGameBySlug,
  getCategories,
  searchGames,
  getRelatedGames
} = require("../services/gameService");
const { syncGamesFromProvider } = require("../services/gameProviderService");

function listGames(req, res) {
  res.json(getAllGames());
}

function showGame(req, res) {
  const game = getGameBySlug(req.params.slug);

  if (!game) {
    return res.status(404).json({ message: "Jogo nao encontrado." });
  }

  res.json({
    ...game,
    relatedGames: getRelatedGames(game.slug, game.category)
  });
}

function listCategories(req, res) {
  res.json(getCategories());
}

function search(req, res) {
  res.json(searchGames(req.query.q));
}

async function syncGames(req, res, next) {
  try {
    const result = await syncGamesFromProvider();
    res.json(result);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listGames,
  showGame,
  listCategories,
  search,
  syncGames
};
