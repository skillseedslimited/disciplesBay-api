const mongoose = require('mongoose');

const SermonSettingSchema = new mongoose.Schema({
    branchesCanPostSermon:{
        type: String,
    },
    branchesCanCreateCategory: {
        type: String,
    },
    allowDownload: {
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('SermonSetting', SermonSettingSchema);