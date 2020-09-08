const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TestimonySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    username:{
        type: String
    },
    testimonyBody: {
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    },
    picture:{
        type: String
    },
    video:{
        type: String
    },
    status: {
        type: Boolean,
        default: false
    },
    anonymous:{
        type: Boolean,
    }    
});

module.exports = Testimony = mongoose.model('testimony', TestimonySchema);

