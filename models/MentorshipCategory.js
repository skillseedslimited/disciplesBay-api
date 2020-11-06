const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const MentorshipCategorySchema = new Schema({
    title : {
        type : String,
        required : true
    },
    banner : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ['active','inactive'],
        default : "active"
    },
    isDeleted : {
        type  : Boolean,
        default : false
    }
},{ timestamps : true });

module.exports = MentorshipCategory = mongoose.model("mentorhip_category",MentorshipCategorySchema);