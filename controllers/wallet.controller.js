const Wallet = require("../models/Wallet");
const WalletHistory = require("../models/WalletHistory");
module.exports = {
  history_limit: 20,

  fetchUserWallet: async function(req, res) {
    try {
      //check user has wallet
      let user = req.user;

      const page = req.query.page && req.query.page > 0 ? req.page : 1;
      let wallet = await Wallet.findOne({ user: user._id })
        .lean()
        .exec();
      if (!wallet) {
        return res
          .status(400)
          .json({ success: false, message: "User doesnt have wallet" });
      }
      let wallet_histories = await WalletHistory.find({ user: user._id })
        .sort({ createdAt: "desc" })
        .skip((page - 1) * this.history_limit)
        .limit(this.history_limit)
        .exec();

      wallet["wallet_histories"] = wallet_histories;

      return res.status(200).json({
        success: true,
        message: "Wallet details fetched successfully",
        data: wallet,
      });
    } catch (error) {
      return res
        .status(400)
        .json({ success: false, message: "User doesnt have wallet", error });
    }
  },

  //fund wallet

  //transfer from wallet
};
