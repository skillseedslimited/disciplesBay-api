const PaymentActions = require("../Actions/PaymentActions");
module.exports = {
  fetchPaymentSettings: async function(req, res) {
    return await PaymentActions.fetchPaymentSettings(req, res);
  },
  updatePaymentSettings: async function(req, res) {
    return await PaymentActions.updatePaymentSettings(req, res);
  },
  initiatePayment: async function(req, res) {
    return await PaymentActions.initiatePayment(req, res);
  },
  getAllTransactions: async function(req, res) {
    return await PaymentActions.getAllTransactions(req, res);
  },
  getSingleTransaction: async function(req, res) {
    return await PaymentActions.getSingleTransaction(req, res)
  }
};
