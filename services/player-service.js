const _ = require("lodash");
const NBA = require("nba");

class PlayerService {
  static async getPlayer(playerName) {
    const player = await NBA.findPlayer(playerName);
    const playerInfo = await NBA.stats.playerInfo({
      PlayerID: player.playerId,
    });
    const playerProfile = await NBA.stats.playerProfile({
      PlayerID: player.playerId,
    });

    return { ...player, info: playerInfo, profile: playerProfile };
  }
}

module.exports = PlayerService;
