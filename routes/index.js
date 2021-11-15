var express = require("express");
var router = express.Router();
const GameService = require("../services/game-service");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/pbp", getGame);

async function getGame(req, res) {
  const gameId = 401360016;
  const result = await GameService.gatPlayersBoxScoreFromGame(gameId);
  res.json(result);
}

module.exports = router;
