const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const commentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  comment: { type: String, default: null },
});
const SermonSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "SermonCategory",
    default: null,
  },
  content_type: {
    type: String,
    enum: ["audio", "video", "ebook"],
  },
  content: {
    type: String,
    required: true,
    default: null,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["save", "publish"],
    required: true,
    default: "save",
  },
  subscription_type: {
    type: String,
    enum: ["free", "paid", "subscription"],
    required: true,
  },
  cover_image: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
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
  comments: [commentSchema],
});

module.exports = mongoose.model("Sermon", SermonSchema);