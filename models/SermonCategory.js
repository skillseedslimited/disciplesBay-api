const mongoose = require("mongoose");

const SermonCategorySchema = new mongoose.Schema({
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
    default: Date.now,
  },
  updatedAt: {
    type: String,
    default: null,
  },
});
module.exports = mongoose.model("SermonCategory", SermonCategorySchema);
