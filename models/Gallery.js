const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GallerySchema = new Schema({
    images: [],
    coverImage: {
        type: String
    },
    date:{
        type: Date
    },
    title:{
        type:String
    }
})

module.exports = Gallery = mongoose.model('gallery', GallerySchema);