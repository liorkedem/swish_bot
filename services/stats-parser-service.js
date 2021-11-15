const sdv = require("sportsdataverse");

const SIMPLE_CATEGORIES = [
  "MIN",
  "OREB",
  "DREB",
  "REB",
  "AST",
  "STL",
  "BLK",
  "TO",
  "PF",
  "+/-",
  "PTS",
];

const PERCENTAGE_CATEGORIES = ["FG", "3PT", "FT"];

class StatsParserService {
  static parsePlayerBoxScore(categories, values) {
    const boxScore = {};
  }

  static parseCategory(category, value) {
    if (SIMPLE_CATEGORIES.includes(category)) {
      return { [category]: Parse.invalue };
    } else if (PERCENTAGE_CATEGORIES.includes(category)) {
      const values = value.split("-");
      const madeValue = values[0];
      const attemptsValue = values[1];
      const madeCategory = `${category}M`
      const attemptsCategory = `${category}A`
      const pctCategory = `${category}P`
      const pctValue = madeValue/
    }
  }
}

module.exports = StatsParserService;
