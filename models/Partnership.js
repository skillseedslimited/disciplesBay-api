const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PartnershipSchema = new Schema({
  name: {
    type: String,
    default: null,
  },
  amount: {
    type: Number,
    default: 0,
  },
  frequency: {
    type: String,
    enum: ["monthly", "quarterly", "yearly"],
    default: "monthly",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = Partnership = mongoose.model(
  "partnerships",
  PartnershipSchema
);
