const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatListSchema = new Schema({
    sender : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    receiver : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    active : {
        type : Boolean,
        default : true
    }

},{ timestamps : true})

module.exports = ChatList = mongoose.model('chatlist', ChatListSchema);