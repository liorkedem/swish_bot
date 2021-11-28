const _ = require("lodash");
const pluralize = require("pluralize");
const {
  AMAZING_GAME_TEMPLATE,
} = require("../constants/game-recap-templates-constants");
const { THESAURUS_TREE } = require("../constants/thesaurus-constants");

class GameRecapsService {
  static recapGame({ player, playerBoxScore, gameBoxScore }) {
    return generateBasicRecap({ player, playerBoxScore, gameBoxScore });
  }
}

function generatePhrase(category, value) {
  if (THESAURUS_TREE[category] && value > 0) {
    const categoryName = _.sample(THESAURUS_TREE[category]);
    return pluralize(categoryName, value, true);
  }
}

function generateBasicRecap2({ player, playerBoxScore }) {
  const statsPhrases = [];
  for (const category of Object.keys(THESAURUS_TREE)) {
    const value = playerBoxScore[category];
    const phrase = generatePhrase(category, value);
    if (phrase) {
      statsPhrases.push(phrase);
    }
  }

  return `${player.fullName} (${statsPhrases.join(", ")})`;
}

function generateBasicRecap({ player, playerBoxScore, gameBoxScore }) {
  const statsPhrases = [];
  for (const category of Object.keys(THESAURUS_TREE)) {
    const value = playerBoxScore[category];
    const phrase = generatePhrase(category, value);
    if (phrase) {
      statsPhrases.push(phrase);
    }
  }

  const playerName = _.get(player, "fullName");
  const position = _.get(player, "info.commonPlayerInfo[0].position");
  const teamAbbreviation = _.get(
    player,
    "info.commonPlayerInfo[0].teamAbbreviation"
  );

  const connectionWord = _.sample(["had", "erupted for", "exploded for"]);
  const playerTeamBoxScore = _.find(
    gameBoxScore,
    (side) => _.get(side, "team.abbreviation") === teamAbbreviation
  );
  const playerTeamGameResult = _.get(playerTeamBoxScore, "winner")
    ? "won"
    : "lost to";

  const opponentTeamBoxScore = _.find(
    gameBoxScore,
    (side) => _.get(side, "team.abbreviation") !== teamAbbreviation
  );

  const statsPhrase = _.slice(statsPhrases, 0, statsPhrases.length - 1)
    .join(", ")
    .concat(" & ", _.last(statsPhrases));

  const minutesPhrase = pluralize("minute", playerBoxScore.MIN, true);

  const playerTeam = _.get(playerTeamBoxScore, "team.displayName");
  const opponentTeam = _.get(opponentTeamBoxScore, "team.displayName");

  return `${playerName} (${position}, ${teamAbbreviation}) ${connectionWord} ${statsPhrase} in ${minutesPhrase} of game as the ${playerTeam} ${playerTeamGameResult} the ${opponentTeam}`;
}

module.exports = GameRecapsService;
