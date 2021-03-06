const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    subject: {
        type: String,
    },
    newsBody: {
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    },
    newsDate:{
        type:Date
    }
})

module.exports = News = mongoose.model('news', NewsSchema);