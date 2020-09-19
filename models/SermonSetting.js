const mongoose = require('mongoose');

const SermonSettingSchema = new mongoose.Schema({
    branchesCanPostSermon:{
        type: Boolean,
        default: false
    },
    branchesCanCreateCategory: {
        type: Boolean,
        default: false
    },
    allowDownload: {
        type: Boolean,
        default: false
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('SermonSetting', SermonSettingSchema);