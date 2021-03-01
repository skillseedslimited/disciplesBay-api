const mongoose = require("mongoose");
const moment = require("moment");
const WorshipCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: moment().format(),
  },
  updatedAt: {
    type: String,
    default: null,
  },
});
module.exports = mongoose.model("WorshipCategory", WorshipCategorySchema);
