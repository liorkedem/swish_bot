const sdv = require("sportsdataverse");

class GameService {
  static async gatGamePlayByPLay(gameId) {
    return await sdv.nba.getPlayByPlay(gameId);
  }

  static async gatPlayerBoxScoreFromGame(playerName, gameId) {
    const playByPlay = await this.gatGamePlayByPLay(gameId);
  }
}

module.exports = GameService;
