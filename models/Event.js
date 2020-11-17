const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
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
    }

})

module.exports = Event = mongoose.model('event', EventSchema);