const mongoose = require("mongoose");
const MentorshipCategory = require("./MentorshipCategory");
const Schema = mongoose.Schema;
const MentorshipLevelSchema = new Schema({
    category_id : {
        type : Schema.Types.ObjectId,
        ref : "MentorshipCategory"
    },
    mentor : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    title : {
        type : String,
        required : true
    },
    description :{
        type : String,
        required : true
    },
    
    isDeleted : {
        type  : Boolean,
        default : false
    }
},{ timestamps : true });

module.exports = MentorshipLevel = mongoose.model("mentorship_level",MentorshipLevelSchema);