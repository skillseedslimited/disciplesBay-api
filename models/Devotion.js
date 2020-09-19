const mongoose = require('mongoose');

const DevotionSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    imageUrl:{
        type: String,
        required: true
    },
    audioUrl:{
        type: String,
        required: true
    },
    videoUrl:{
        type: String
    },
    text:{
        type: String,
        required: true
    },
    publishDate:{
        type: Date,
        required: true
    },
    time:{
        type: String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Devotion', DevotionSchema);