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

    videoURL: {
        type: String
    },

    isLive:{
        type: Boolean
    }, 

    passed:{
        type: Boolean
    },

    creationDate: {
        type: Date,
        default: Date.now()
    },

    reoccurrant: {
        type: Boolean,
        default: false
    },

    // Reoccurring Events settings
    reoccurrantDate: {
        type: Date,
    },

    reoccurrantStartDate: {
        type: Date,
    },

    reoccurrantEndDate: {
        type: Date,
    },

}, { timestamps: true })

module.exports = Event = mongoose.model('event', EventSchema);