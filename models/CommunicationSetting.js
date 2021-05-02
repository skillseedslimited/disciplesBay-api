const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require('moment');
const CommunicationSettingSchema = new Schema({
    communication_type : {
        type:String,
        required : true
    },
    amount : {
        type : Number,
        required : true,
        default:0
    },
   
},{timestamps :true })

module.exports = CommunicationSetting = mongoose.model("CommunicationSetting",CommunicationSettingSchema);