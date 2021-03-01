const WorshipActions = require("../Actions/WorshipAction");
module.exports = {
  sermon_limit: 20,
  createWorship: async function(req, res) {
    return await WorshipActions.createWorship(req, res);
  },

  listWorship: async function(req, res) {
    return await WorshipActions.listWorship(req, res);
  },
  //update sermon
  updateWorship: async function(req, res) {
    return await WorshipActions.updateWorship(req, res);
  },

  //delete sermon
  deleteWorship: async function(req, res) {
    return await WorshipActions.deleteWorship(req, res);
  },
  getWorship: async function(req, res) {
    return await WorshipActions.getWorship(req, res);
  },

  //create sermon category
  createWorshipCategory: async function(req, res) {
    return await WorshipActions.createWorshipCategory(req, res);
  },

  //list sermon category
  listWorshipCategories: async function(req, res) {
    return await WorshipActions.listWorshipCategories(req, res);
  },
  //update sermon category
  updateWorshipCategory: async function(req, res) {
    return await WorshipActions.updateWorshipCategory(req, res);
  },
  //fetch single sermon category
  fetchSingleWorshipCategory: async function(req, res) {
    return await WorshipActions.fetchSingleWorshipCategory(req, res);
  },
  //delete sermon category
  deleteWorshipCategory: async function(req, res) {
    return await WorshipActions.deleteWorshipCategory(req, res);
  },
//   featuredSermons: async function(req, res) {
//     return await sermonActions.featuredSermon(req, res);
//   },
//   getFeaturedSermon: async function(req, res) {
//     return await sermonActions.getFeaturedSermon(req, res);
//   },
//   userSermon: async function(req, res) {
//     return await sermonActions.userSermon(req, res);
//   },
  getWorshipWithNoLimit: async function (req, res) {
    return await WorshipActions.getWorshipWithNoLimit(req,res);
  },
  getAdminWorship: async function (req, res) {
    return await WorshipActions.getAdminWorship(req,res);
  },
//   unFeaturedSermons: async function(req, res) {
//     return await sermonActions.unFeaturedSermon(req, res);
//   },
};
