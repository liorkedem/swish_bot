const _ = require("lodash");
const express = require("express");
const router = express.Router();
const GameService = require("../services/game-service");
const TwitterService = require("../services/twitter-service");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/pbp", getGame);

async function getGame(req, res) {
  const gameId = 401360016;
  const result = await GameService.gatPlayersBoxScoreFromGame(gameId);
  // const topPlayers = result.filter((p) => p.PTS >= 15);
  const playerKey = "Anthony Davis";
  const anthonyDavis = result[playerKey];

  const message =
    playerKey +
    " had a great game finishing with: " +
    JSON.stringify(anthonyDavis);

  await TwitterService.write(message);
  // res.json(result);
  res.json(message);
}

module.exports = router;
