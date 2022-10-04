const _ = require("lodash");
const axios = require("axios");
const cheerio = require("cheerio");

class BasketballReferenceService {
  static async getTeamPlayers(teamId, season) {
    try {
      const teamUrl = `https://www.basketball-reference.com/teams/${teamId}/${season}.html`;
      const teamPlayers = await scrapePlayersFromTeamUrl(teamUrl, teamId);
      return teamPlayers;
    } catch (error) {
      console.log(error);
    }
  }
}

async function scrapePlayersFromTeamUrl(teamUrl, team) {
  const { data } = await axios.get(teamUrl);
  const $ = cheerio.load(data);
  const listItems = $(".sortable tbody tr");
  const players = [];
  listItems.each((idx, el) => {
    const values = $(el).children("td");
    const id = values[0].children[0].attribs.href
      .replace("/players/", "")
      .replace(".html", "")
      .split("/")[1];
    const name = values[0].children[0].children[0].data;
    const position = values[1].children[0].data;
    const height = values[2].children[0].data;
    const player = {
      id,
      name,
      position,
      height,
      team,
      health: "",
      image: "",
      image_credit: "",
      image_credit_url: "",
      extra_info: "",
    };

    players.push(player);
  });

  return players;
}

module.exports = BasketballReferenceService;
