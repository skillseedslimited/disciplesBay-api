const kidsActions = require("../Actions/KidSectionAction");
module.exports = {
  sermon_limit: 20,
  createKids: async function(req, res) {
    return await kidsActions.createKids(req, res);
  },

  listKids: async function(req, res) {
    return await kidsActions.listKids(req, res);
  },
  //update sermon
  updateKids: async function(req, res) {
    return await kidsActions.updateKids(req, res);
  },

  //delete sermon
  deleteKids: async function(req, res) {
    return await kidsActions.deleteKids(req, res);
  },
  getKids: async function(req, res) {
    return await kidsActions.getKids(req, res);
  },

  //create sermon category
  createKidsCategory: async function(req, res) {
    return await kidsActions.createKidsCategory(req, res);
  },

  //list sermon category
  listKidsCategories: async function(req, res) {
    return await kidsActions.listKidsCategories(req, res);
  },
  //update sermon category
  updateKidsCategory: async function(req, res) {
    return await kidsActions.updateKidsCategory(req, res);
  },
  //fetch single sermon category
  fetchSingleKidsCategory: async function(req, res) {
    return await kidsActions.fetchSingleKidsCategory(req, res);
  },
  //delete sermon category
  deleteKidsCategory: async function(req, res) {
    return await kidsActions.deleteKidsCategory(req, res);
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
  getKidsWithNoLimit: async function (req, res) {
    return await kidsActions.getKidsWithNoLimit(req,res);
  },
  getAdminKids: async function (req, res) {
    return await kidsActions.getAdminKids(req,res);
  },
//   unFeaturedSermons: async function(req, res) {
//     return await sermonActions.unFeaturedSermon(req, res);
//   },
};
