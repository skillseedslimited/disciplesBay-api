const storeAction = require("../Actions/StoreAction");
// const { functionsIn } = require("lodash");
module.exports = {
  deleteNull: async function(req, res) {
    return await storeAction.deleteNull(req, res);
  },

  fetchAllStoreContents: async function(req, res) {
    return await storeAction.fetchAllStoreContents(req, res);
  },

  fetchSingleStoreContent: async function(req, res) {
    return await storeAction.fetchSingleStoreContent(req, res);
  },

  updateStoreContent: async function(req, res) {
    return await storeAction.updateStoreContent(req, res);
  },

  purchaseStoreItem: async function(req, res) {
    return await storeAction.purchaseStoreItem(req, res);
  },

  gift: async function(req, res) {
    return await storeAction.gift(req, res)
  }
};
