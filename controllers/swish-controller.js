const _ = require("lodash");
const BasketballReferenceService = require("../services/basketball-reference-service");
const SwishService = require("../services/swish-service");
const TEAM_IDS = [
  "ATL",
  "BOS",
  "BRK",
  "CHO",
  "CHI",
  "CLE",
  "DAL",
  "DEN",
  "DET",
  "GSW",
  "HOU",
  "IND",
  "LAC",
  "LAL",
  "MEM",
  "MIA",
  "MIL",
  "MIN",
  "NOP",
  "NYK",
  "OKC",
  "ORL",
  "PHI",
  "PHO",
  "POR",
  "SAC",
  "SAS",
  "TOR",
  "UTA",
  "WAS",
];

class SwishController {
  static async addUpdatePlayersBasicInfo(req, res) {
    const { season, teamId } = req.query;
    let players = {};

    if (teamId) {
      const teamPlayers = await BasketballReferenceService.getTeamPlayers(
        teamId,
        season
      );
      players = { ...teamPlayers };
    } else {
      for (const teamId of TEAM_IDS) {
        const teamPlayers = await BasketballReferenceService.getTeamPlayers(
          teamId,
          season
        );
        players = { ...players, ...teamPlayers };
      }
    }

    const result = await SwishService.addUpdatePlayersBasicInfo(players);

    res.json(result);
  }
}

module.exports = SwishController;
