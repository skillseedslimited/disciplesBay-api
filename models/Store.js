const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
  item: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  item_type: {
    type: String,
    enum: ["sermon", "others"],
    default: "others",
  },
  quantity: {
    type: Number,
    default: 0,
  },
  content_type: {
    type: String,
    enum: ["audio", "video", "ebook", "others"],
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
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

module.exports = Store = mongoose.model("stores", StoreSchema);
