const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const CounsellorRequestSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "users",
        required: true,
      },
      counsellor: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "users",
        required: true,
      },
      call_type : {
          type : String,
          enum : ["call","video_call","chat"],
          default : "call"
      },
      status :{
        type : String,
        enum : ["pending","accepted","rejected","expired"],
        default : "pending"
      },
      expires_in:{
        type: Date
      },
      used : {
          type : Boolean,
          default  :false
      }
    },
      { timestamps : true}
);

module.exports = CounsellorRequest = mongoose.model("CounsellorRequest",CounsellorRequestSchema)