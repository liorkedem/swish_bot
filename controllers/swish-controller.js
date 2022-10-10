const _ = require("lodash");
const BasketballReferenceService = require("../services/basketball-reference-service");
const TeamService = require("../services/team-service");
const SwishService = require("../services/swish-service");
const { format } = require("morgan");
const { forEach } = require("lodash");
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
    let players = {};
    const teams = await TeamService.getTeams();
    for (const { team } of teams) {
      const { id: teamId } = team;
      const teamPlayers = await TeamService.getTeamPlayers(teamId);

      for (const player of teamPlayers) {
        players[player.id] = player;
      }
    }

    const result = await SwishService.addUpdatePlayersBasicInfo(players);

    res.json(result);
  }
}

module.exports = SwishController;
