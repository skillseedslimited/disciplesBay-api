const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DonationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    default: 0,
  },
  narrative: {
    type: String,
    default: null,
  },
  donation_type: {
    type: String,
    enum: ["single", "partnership"],
    default: "single",
  },
  gateway: {
    type: String,
    enum: ["paypal", "flutterave"],
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Donation = mongoose.model("donations", DonationSchema);
