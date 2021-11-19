const PERCENTAGE_CATEGORIES = ["FG", "3PT", "FT"];
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

const DFS_RATIO = {
  PTS: 1,
  AST: 1.5,
  BLK: 3,
  STL: 3,
  REB: 1.2,
  TO: -1,
};
const ROTO_8CAT_RATIO = {
  PTS: 1.333, //1
  AST: 4.579,
  STL: 14.293,
  BLK: 20.0,
  REB: 2.598,
  "3PTM": 10.833,
  FGPFIXED: 2.724,
  FTPFIXED: 5.762,
};
const ROTO_9CAT_RATIO = {
  ...ROTO_8CAT_RATIO,
  TO: -8.024,
};
const PCT_BOUNDS = {
  "3PTP": { low: 0.364, high: 0.48 },
  FGP: { low: 0.458, high: 0.59 },
  FTP: { low: 0.782, high: 1.0 },
};
module.exports = {
  PERCENTAGE_CATEGORIES,
  SIMPLE_CATEGORIES,
  DFS_RATIO,
  ROTO_8CAT_RATIO,
  ROTO_9CAT_RATIO,
  PCT_BOUNDS,
};
