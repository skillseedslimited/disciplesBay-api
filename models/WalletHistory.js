const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WalletHistorySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
  narrative: {
    type: String,
  },
  status: {
    type: String,
    enum: ["credit", "debit"],
    required: false,
    default: "credit",
  },
});

module.exports = WalletHistory = mongoose.model(
  "wallet_histories",
  WalletHistorySchema
);
