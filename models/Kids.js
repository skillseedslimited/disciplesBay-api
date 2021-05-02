const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
const commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  comment: { type: String, default: null },
});
const KidsSchema = new Schema({
  title: {
    type: String
  },
  author: {
    type: String
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "KidsCategory",
    default: null,
  },
  content_type: {
    type: String,
    enum: ["audio", "video", "ebook"],
  },
  content: {
    type: String,
    default: null,
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ["save", "publish"],
    default: "save",
  },
  subscription_type: {
    type: String,
    enum: ["free", "paid", "subscription"]
  },
  cover_image: {
    type: String
  },
  price: {
    type: Number,
    default: 0,
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
  featured:{
    type:Boolean,
    default: false
  },
  comments: [commentSchema],
});

module.exports = mongoose.model("Kids", KidsSchema);
