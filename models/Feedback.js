const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeedbackSchema = new Schema({
    message:{
        type: String
    },
    user:{
        type: Schema.Types.ObjectId,
        ref:"users"
    },
    date:{
        type: Date,
        default: Date.now
    }

})

module.exports = FeedBack = mongoose.model('feedback', FeedbackSchema);