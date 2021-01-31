const storeAction = require("../Actions/StoreAction");
// const { functionsIn } = require("lodash");
module.exports = {
  webFetchSingleStoreContent: async function(req, res) {
    return await storeAction.webFetchSingleStoreContent(req, res);
  },

  webPurchaseStoreItem: async function(req, res) {
    return await storeAction.webPurchaseStoreItem;
  },
};
