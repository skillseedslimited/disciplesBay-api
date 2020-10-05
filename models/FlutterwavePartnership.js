const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FlutterwavePartnershipSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  token: {
    type: String,
    default: null,
  },
  user: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = FlutterwavePartnership = mongoose.model(
  "flutterwave_partnerships",
  FlutterwavePartnershipSchema
);
