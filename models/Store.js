const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const StoreSchema = new Schema({
  item: {
    type: Schema.Types.ObjectId,
    ref:"Sermon",
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
    default: moment().format(),
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  featured:{
    type:Boolean,
    default: false
  }
});

module.exports = Store = mongoose.model("stores", StoreSchema);
