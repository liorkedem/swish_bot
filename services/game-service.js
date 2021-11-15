const _ = require("lodash");
const sdv = require("sportsdataverse");

const StatsParserService = require("./stats-parser-service");

class GameService {
  static async gatGamePlayByPLay(gameId) {
    return await sdv.nba.getPlayByPlay(gameId);
  }

  static async gatPlayersBoxScoreFromGame(gameId) {
    const gamePlayByPLay = await this.gatGamePlayByPLay(gameId);
    const gameAthletes = getGameAthletes(gamePlayByPLay);
    const statsCategories = getStatsCategories(gamePlayByPLay);
    let results = {};
    for (const teamAthletes of gameAthletes) {
      for (const athlete of teamAthletes) {
        const playerBoxScore = this.gatPlayerBoxScoreFromGame(
          athlete,
          statsCategories
        );

        const playerKey = athlete.athlete.displayName;

        results = { ...results, [playerKey]: playerBoxScore };
      }
    }
    return results;
  }

  static gatPlayerBoxScoreFromGame(athlete, categories) {
    const values = athlete.stats;
    const playerBoxScore = StatsParserService.parsePlayerBoxScore(
      categories,
      values
    );
    return playerBoxScore;
  }
}

function getStatsCategories(gamePlayByPLay) {
  return _.get(gamePlayByPLay, "boxScore.players[0].statistics[0].names");
}

function getGameAthletes(gamePlayByPLay) {
  const result = [];
  result.push(
    _.get(gamePlayByPLay, "boxScore.players[0].statistics[0].athletes")
  );
  result.push(
    _.get(gamePlayByPLay, "boxScore.players[1].statistics[0].athletes")
  );
  return result;
}

module.exports = GameService;
