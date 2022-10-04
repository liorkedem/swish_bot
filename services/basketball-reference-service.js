const _ = require("lodash");
const fetch = require("node-fetch");

class BasketballReferenceService {
  static async getTeamPlayers(teamId, season) {
    try {
      const teamUrl = `https://www.basketball-reference.com/teams/${teamId}/${season}.html`;
      const response = await fetch(teamUrl);
      const body = await response.text();
      console.log(body); // prints a chock full of HTML richness
      return body;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = BasketballReferenceService;
