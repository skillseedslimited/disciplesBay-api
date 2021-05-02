const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
const TransactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  transaction_id: {
    type: String,
    required: true,
  },
  narrative: {
    type: String,
    required: true,
  },
  transaction_type: {
    type: String,
    enum: ["store", "donation"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: moment().format(),
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = Transaction = mongoose.model(
  "transactions",
  TransactionSchema
);
