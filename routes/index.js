var express = require("express");
const sdv = require("sportsdataverse");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/pbp", getGame);

async function getGame(req, res) {
  const gameId = 401360016;
  const result = await sdv.nba.getPlayByPlay(gameId);
  res.json(result);
}

module.exports = router;
