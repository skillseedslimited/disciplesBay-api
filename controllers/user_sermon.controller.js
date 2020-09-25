const SermonAction = require("../Actions/SermonActions");

module.exports = {
  sermon_limit: 20,

  fetchUserSermons: async function(req, res) {
    return await SermonAction.fetchUserSermons(req, res);
  },

  //view my sermon
};
