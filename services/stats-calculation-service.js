const _ = require("lodash");

const DFS_RATIO = {
  "3PTM": 3,
  "2PTM": 2,
  FTM: 1,
  REB: 1.2,
  AST: 1.5,
  BLK: 2,
  STL: 2,
  TO: -1,
};

class StatsCalculationService {
  static calculateDFS(categories, values) {
    let dfs = 0;
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const value = values[i];
      const dfsCategory = DFS_RATIO[category];
      if (dfsCategory) {
        dfs += dfsCategory * value;
      }
    }
    return boxScore;
  }
}

module.exports = StatsCalculationService;
