const _ = require("lodash");
const {
  AMAZING_GAME_TEMPLATE,
} = require("../constants/game-recap-templates-constants");

class GameRecapsService {
  static recapGame(player) {
    const props = {};
    // const compiled = _.template(AMAZING_GAME_TEMPLATE[0]);
    // return compiled(props);
    return JSON.stringify(player);
  }
}

module.exports = GameRecapsService;
