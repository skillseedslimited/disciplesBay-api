const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GallerySchema = new Schema({
    gallery: [
        {
            image:{
                type: String
            }
        }
    ],
    coverImage: {
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    },
    title:{
        type:String
    }
})

module.exports = Gallery = mongoose.model('gallery', GallerySchema);