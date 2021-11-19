const _ = require("lodash");
const GameService = require("../services/game-service");

class GameController {
  static async getGameTopPlayers(req, res) {
    const { gameId } = req.query;
    const playersBoxScore = await GameService.gatGamePlayersBoxScore(gameId);
    // const topPlayers = _.filter()

    res.json(playersBoxScore);
  }
}

module.exports = GameController;
