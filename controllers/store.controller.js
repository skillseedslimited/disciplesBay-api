const storeAction = require("../Actions/StoreAction");
// const { functionsIn } = require("lodash");
module.exports = {
  fetchAllStoreContents: async function(req, res) {
    return await storeAction.fetchAllStoreContents(req, res);
  },

  fetchSingleStoreContent: async function(req, res) {
    return await storeAction.fetchSingleStoreContent(req, res);
  },

  updateStoreContent: async function(req, res) {
    return await storeAction.updateStoreContent(req, res);
  },
};
