const _ = require("lodash");
const express = require("express");
const router = express.Router();
const ScheduleController = require("../controllers/schedule-controller");
const GameController = require("../controllers/game-controller");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/get-ended-games", ScheduleController.getEndedGames);
router.get("/get-non-ended-games", ScheduleController.getNonEndedGames);
router.get("/get-game-top-players", GameController.getGameTopPlayers);

// router.get("/pbp", getGame);

// async function getEndedGames(req, res) {
//   // const gameId = 401360016;
//   // const result = await GameService.gatPlayersBoxScoreFromGame(gameId);
//   // const result = await GameService.getGamesByDate(2021, 11, 18);
//   // res.json(result);
//   // const playerKey = "Anthony Davis";
//   // const anthonyDavis = result[playerKey];
//   // const message =
//   //   playerKey +
//   //   " had a great game finishing with: " +
//   //   JSON.stringify(anthonyDavis);
//   // await TwitterService.write(message);
//   // res.json(result);
//   // res.json(message);
// }

module.exports = router;
