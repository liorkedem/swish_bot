const _ = require("lodash");
const GameService = require("../services/game-service");
const PlayerService = require("../services/player-service");
const GameRecapsService = require("../services/game-recaps-service");
const { PERFORMANCE_THRESHOLDS } = require("../constants/stats-constants");

class GameController {
  static async getGameTopPlayers(req, res) {
    const { gameId } = req.query;
    const playersBoxScore = await GameService.getGamePlayersBoxScore(gameId);
    const gameBoxScore = await GameService.getGameBoxScore(gameId);
    const topPlayersBoxScore = _.pickBy(playersBoxScore, (playerBoxScore) => {
      return (
        playerBoxScore.DFS >= PERFORMANCE_THRESHOLDS.DFS.GOOD ||
        playerBoxScore.ROTO9 >= PERFORMANCE_THRESHOLDS.ROTO9.GOOD
      );
    });

    const recaps = [];
    for (const [playerName, playerBoxScore] of Object.entries(
      topPlayersBoxScore
    )) {
      const player = await PlayerService.getPlayer(playerName);
      recaps.push(
        GameRecapsService.recapGame({ player, playerBoxScore, gameBoxScore })
      );
    }

    res.json(recaps);
  }
}

module.exports = GameController;
