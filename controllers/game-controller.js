const _ = require("lodash");
const sdv = require("sportsdataverse");
const GameService = require("../services/game-service");
const GameRecapsService = require("../services/game-recaps-service");
const { PERFORMANCE_THRESHOLDS } = require("../constants/stats-constants");

class GameController {
  static async getSomething(req, res) {
    const result = await sdv.nba.getPicks(401283399);
    res.json(result);
  }

  static async getGamePlayersStats(req, res) {
    const { gameId, rawStats, onlyTopPerformers } = req.query;
    const playersBoxScore = await GameService.gatGamePlayersBoxScore(gameId);
    let selectedPlayersBoxScore = playersBoxScore;

    if (onlyTopPerformers) {
      const topPlayersBoxScore = _.pickBy(playersBoxScore, (playerBoxScore) => {
        return (
          playerBoxScore.DFS >= PERFORMANCE_THRESHOLDS.DFS.GOOD ||
          playerBoxScore.ROTO9 >= PERFORMANCE_THRESHOLDS.ROTO9.GOOD
        );
      });
      selectedPlayersBoxScore = topPlayersBoxScore;
    }

    const gamePlayerStats = [];
    for (const [playerName, boxScore] of Object.entries(
      selectedPlayersBoxScore
    )) {
      if (rawStats) {
        gamePlayerStats.push(playersBoxScore);
      } else {
        gamePlayerStats.push(
          GameRecapsService.recapGame({ playerName, boxScore })
        );
      }
    }

    res.json(gamePlayerStats);
  }
}

module.exports = GameController;
