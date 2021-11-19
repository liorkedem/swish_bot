const _ = require("lodash");
const sdv = require("sportsdataverse");
const StatsCalculationService = require("./stats-calculation-service");
const StatsParserService = require("./stats-parser-service");

class GameService {
  static async gatGamePlayersBoxScore(gameId) {
    const gamePlayByPLay = await gatGamePlayByPLay(gameId);
    const gameAthletes = getGameAthletes(gamePlayByPLay);
    const statsCategories = getStatsCategories(gamePlayByPLay);
    let results = {};
    for (const teamAthletes of gameAthletes) {
      for (const athlete of teamAthletes) {
        const playerBoxScore = gatGamePlayerBoxScore(athlete, statsCategories);

        const playerKey = athlete.athlete.displayName;

        results = { ...results, [playerKey]: playerBoxScore };
      }
    }
    return results;
  }
}

async function gatGamePlayByPLay(gameId) {
  return await sdv.nba.getPlayByPlay(gameId);
}
function gatGamePlayerBoxScore(athlete, categories) {
  const values = athlete.stats;
  const playerBoxScore = StatsParserService.parsePlayerBoxScore(
    categories,
    values
  );

  playerBoxScore.DFS = StatsCalculationService.calculateDFS(categories, values);
  return playerBoxScore;
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
