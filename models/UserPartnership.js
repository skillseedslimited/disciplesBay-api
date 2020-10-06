const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
const UserPartnershipSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  partnership_id: {
    type: Schema.Types.ObjectId,
    ref: "Partnership",
  },
  user_partnership: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  gateway: {
    type: String,
    enum: ["flutterwave", "paypal"],
  },
  amount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  next_charge: {
    type: Date,
    default: moment().format("YYYY-MM-DD"),
  },
});

module.exports = UserPartnership = mongoose.model(
  "user_partnerships",
  UserPartnershipSchema
);
