const mongoose = require("mongoose");
const Schema =  mongoose.Schema;
const moment = require("moment");
const CallLogsSchema = new Schema({
    sender : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    receiver : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    channel_name : {
        type : String
    },
    call_type : {
        type : String
    },
    ring_time : {
        type : Date,
        default : moment()
    },

    call_start_time : {
        type : Date,
        default : moment()
    },
    time_ended : {
        type : Date,
        default : moment(),
        default : null
    },
    amount_used : {
        type : Number,
        default : 0
    },
    status : {
        type : String,
        enum : ["ring","waiting","active","busy","end"],
        default : "active"
    },
    
},{timestamps :true });

module.exports = CallLogs = mongoose.model("CallLogs",CallLogsSchema);