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
        type: Date
    },
    venue:{
        type: String
    },
    eventType:{
        type: String
    },
    description:{
        type: String
    }

})

module.exports = Event = mongoose.model('event', EventSchema);