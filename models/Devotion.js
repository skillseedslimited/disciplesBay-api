const mongoose = require('mongoose');

const DevotionSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String
    },
    audioUrl:{
        type: String
    },
    videoUrl:{
        type: String
    },
    text:{
        type: String
    },
    publishDate:{
        type: Date
    },
    time:{
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Devotion', DevotionSchema);