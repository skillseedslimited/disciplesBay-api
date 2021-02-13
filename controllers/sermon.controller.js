const sermonActions = require("../Actions/SermonActions");
module.exports = {
  sermon_limit: 20,
  createSermon: async function(req, res) {
    return await sermonActions.createSermon(req, res);
  },

  listSermons: async function(req, res) {
    return await sermonActions.listSermons(req, res);
  },
  //update sermon
  updateSermon: async function(req, res) {
    return await sermonActions.updateSermon(req, res);
  },

  //delete sermon
  deleteSermon: async function(req, res) {
    return await sermonActions.deleteSermon(req, res);
  },
  getSermon: async function(req, res) {
    return await sermonActions.getSermon(req, res);
  },

  //create sermon category
  createSermonCategory: async function(req, res) {
    return await sermonActions.createSermonCategory(req, res);
  },

  //list sermon category
  listSermonCategories: async function(req, res) {
    return await sermonActions.listSermonCategories(req, res);
  },
  //update sermon category
  updateSermonCategory: async function(req, res) {
    return await sermonActions.updateSermonCategory(req, res);
  },
  //fetch single sermon category
  fetchSingleSermonCategory: async function(req, res) {
    return await sermonActions.fetchSingleSermonCategory(req, res);
  },
  //delete sermon category
  deleteSermonCategory: async function(req, res) {
    return await sermonActions.deleteSermonCategory(req, res);
  },
  featuredSermons: async function(req, res) {
    return await sermonActions.featuredSermon(req, res);
  },
  getFeaturedSermon: async function(req, res) {
    return await sermonActions.getFeaturedSermon(req, res);
  },
  userSermon: async function(req, res) {
    return await sermonActions.userSermon(req, res);
  },
  getSermonWithNoLimit: async function (req, res) {
    return await sermonActions.getSermonWithNoLimit(req,res);
  },
  getAdminSermon: async function (req, res) {
    return await sermonActions.getAdminSermon(req,res);
  },
  unFeaturedSermons: async function(req, res) {
    return await sermonActions.unFeaturedSermon(req, res);
  },
};
