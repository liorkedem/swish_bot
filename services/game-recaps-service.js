const _ = require("lodash");
const {
  AMAZING_GAME_TEMPLATE,
} = require("../constants/game-recap-templates-constants");

class GameRecapsService {
  static recapGame(player) {
    console.log("--------", player);
    const compiled = _.template(AMAZING_GAME_TEMPLATE[0]);
    return compiled(player);
  }
}

module.exports = GameRecapsService;
