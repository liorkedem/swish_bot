const _ = require("lodash");
const GameService = require("../services/game-service");
const { PERFORMANCE_THRESHOLDS } = require("../constants/stats-constants");

class GameController {
  static async getGameTopPlayers(req, res) {
    const { gameId } = req.query;
    const playersBoxScore = await GameService.gatGamePlayersBoxScore(gameId);
    const topPlayers = _.pickBy(playersBoxScore, (player) => {
      return (
        player.DFS >= PERFORMANCE_THRESHOLDS.DFS.GOOD ||
        player.ROTO9 >= PERFORMANCE_THRESHOLDS.ROTO9.GOOD
      );
    });

    res.json(topPlayers);
  }
}

module.exports = GameController;
