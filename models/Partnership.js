const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
const PartnershipSchema = new Schema({
  name: {
    type: String,
    default: null,
  },
  start_amount: {
    type: Number,
    default: 0,
  },
  end_amount: {
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
    default: moment().format(),
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
