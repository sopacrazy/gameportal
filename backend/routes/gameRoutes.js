const express = require("express");
const {
  listGames,
  showGame,
  listCategories,
  search
} = require("../controllers/gameController");

const router = express.Router();

router.get("/games", listGames);
router.get("/games/:slug", showGame);
router.get("/categories", listCategories);
router.get("/search", search);

module.exports = router;
