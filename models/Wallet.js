const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
const WalletSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 10000,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    required: false,
    default: "active",
  },
  createdAt: {
    type: Date,
    default: moment().format(),
  },
});

module.exports = Wallet = mongoose.model("wallets", WalletSchema);
