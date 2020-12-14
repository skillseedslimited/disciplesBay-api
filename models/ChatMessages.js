const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatMessagesSchema = new Schema({
    chat_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "ChatList"
    },
    receiver : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    message:{
        type:String,
        default : ""
    },
    read:{
        type: Boolean,
        default : false
    },

}, { timestamps : true})

module.exports = ChatMessages = mongoose.model('chat_messages', ChatMessagesSchema);