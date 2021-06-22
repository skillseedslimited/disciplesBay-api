const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActiveEventSchema = new Schema({
    eventName:{
        type: String
    },
    coverImage:{
        type: String
    },
    date:{
        type: Date
    },
    time:{
        type: String
    },
    venue:{
        type: String
    },
    eventType:{
        type: String
    },
    description:{
        type: String
    },
    eventURL:{
        type:String
    },
    isLive:{
        type: Boolean
    },
    

})

module.exports = ActiveEvent = mongoose.model('activeEvent', ActiveEventSchema);