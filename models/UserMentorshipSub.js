const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

// create schema
const UserMentorshipSubSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    category : {
        type : Schema.Types.ObjectId,
        ref : "MentorshipCategory"
    },
    level : {
        type : Schema.Types.ObjectId,
        ref : "MentorshipLevel"
    },
    subscription : {
        type : Schema.Types.ObjectId,
        ref : "MentorshipSubscription"
    },
    amount : {
        type : Number,
        default : 0
    },
    date_start : {
        type : Date,
        default : moment.now()
    },
    date_end : {
        type : Date,
       default : ''
    },
    status : {
        type : String,
        enum : ["active","inactive"],
        default : "active"
    }

},{timestamps : true});

module.exports = UserMentorshipSub = mongoose.model("user_mentorship_sub",UserMentorshipSubSchema);