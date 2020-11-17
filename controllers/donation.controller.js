const DonationAction = require("../Actions/DonationActions");
module.exports = {
  fetchAllDonations: async function (req, res) {
    return await DonationAction.fetchAllDonations(req, res);
  },
  createPartnership: async function (req, res) {
    return await DonationAction.createPartnership(req, res);
  },
  listPartnerShips: async function (req, res) {
    return await DonationAction.listPartnerShips(req, res);
  },
  updatePartnership: async function (req, res) {
    return await DonationAction.updatePartnership(req, res);
  },
  deletePartnership: async function (req, res) {
    return await DonationAction.deletePartnership(req, res);
  },
  fetchActivePartnership: async function (req, res) {
    return await DonationAction.fetchActivePartnership(req, res);
  },
  fetchUserActivePartnership: async function (req, res) {
    return await DonationAction.fetchUserActivePartnership(req, res);
  },
  giveDonation: async function (req, res) {
    const resp = await DonationAction.giveDonation(req, res);
    return resp;
  },
  subscribeToPartnership: async function (req, res) {
    return await DonationAction.subscribeToPartnership(req, res);
  },
  fetchUserDonations: async function (req, res) {
    return await DonationAction.fetchUserDonations(req, res);
  },
};
