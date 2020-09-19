const mongoose = require('mongoose');

const TestimonySettingSchema = new mongoose.Schema({
    allowVideo:{
        type: Boolean,
        default: true
    },
    videoLimit: {
        type: Number,
        required: true
    },
    videoLimitUnit: {
        type: String,
        default: 'seconds',
        enum: ['seconds', 'minutes']
    },
    textLimit: {
        type: Number
    },
    textLimitUnit: {
        type: String,
        default: 'words',
        enum: ['characters', 'words']
    },
    showPicture: {
        type: Boolean,
        default: true
    },
    showFullName: {
        type: Boolean,
        default: true
    },
    anonymous: {
        type: Boolean,
        default: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('TestimonySetting', TestimonySettingSchema);