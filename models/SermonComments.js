const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const SermonCommentSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  }, 

  body: {
    type: String
  }
}, { timestamps : true});

module.exports = SermonComment = mongoose.model("comment", SermonCommentSchema);
