const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
const NotificationSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  message: {
    type: String,
    required: true,
  },
  resource_link: {
    type: String,
    default: "#",
  },
  notification_id: {
    type: String,
    default: null,
  },
  type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: moment().format(),
  },
  updatedAt: {
    type: String,
    default: null,
  },
  heading:{
    type:String,
    default:null
  }
});

module.exports = Notification = mongoose.model(
  "notifications",
  NotificationSchema
);
