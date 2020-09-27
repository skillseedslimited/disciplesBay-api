const PaymentActions = require("../Actions/PaymentActions");
module.exports = {
  fetchPaymentSettings: async function(req, res) {
    return await PaymentActions.fetchPaymentSettings(req, res);
  },
  updatePaymentSettings: async function(req, res) {
    return await PaymentActions.updatePaymentSettings(req, res);
  },
};
