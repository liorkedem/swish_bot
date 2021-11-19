const _ = require("lodash");
const GameService = require("../services/game-service");

class GameController {
  static async getGameTopPlayers(req, res) {
    const { gameId } = req.query;
    const playersBoxScore = await GameService.gatGamePlayersBoxScore(gameId);
    const topPlayers = _.pickBy(
      playersBoxScore,
      (player) => player.ROTO9 >= 50
    );

    res.json(topPlayers);
  }
}

module.exports = GameController;
