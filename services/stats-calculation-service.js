const _ = require("lodash");
const {
  DFS_RATIO,
  ROTO_9CAT_RATIO,
  ROTO_8CAT_RATIO,
  PCT_BOUNDS,
} = require("../constants/stats-constants");

class StatsCalculationService {
  static calculateDFS(categories, values) {
    let dfs = 0;
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const value = values[i];
      const dfsCategory = DFS_RATIO[category];
      if (dfsCategory && value) {
        dfs += dfsCategory * value;
      }
    }
    return dfs;
  }

  static calculateRoto8Cat(categories, values) {
    let roto8CatValue = 0;
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const value = values[i];
      const roto8Category = ROTO_8CAT_RATIO[category];
      if (roto8Category && value) {
        roto8CatValue += roto8Category * value;
      }
    }
    return roto8CatValue;
  }

  static calculateRoto9Cat(categories, values) {
    let roto9CatValue = 0;
    for (let i = 0; i < categories.length; i++) {
      const category = categories[i];
      const value = values[i];
      const roto9Category = ROTO_9CAT_RATIO[category];
      if (roto9Category && value) {
        roto9CatValue += roto9Category * value;
      }
    }
    return roto9CatValue;
  }

  static convertPercentToFixed(attempts, percent, category) {
    const bounds = PCT_BOUNDS[category];
    if (percent < bounds.low) {
      return (bounds.low - percent) * -1 * attempts * 2;
    } else {
      return (percent - bounds.low) * attempts * 2;
    }
  }
}

module.exports = StatsCalculationService;
