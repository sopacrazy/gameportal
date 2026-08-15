const express = require("express");
const { syncGames } = require("../controllers/gameController");

const router = express.Router();

router.post("/sync-games", syncGames);

module.exports = router;
