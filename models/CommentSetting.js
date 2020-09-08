const mongoose = require('mongoose');

const SermonSettingSchema = new mongoose.Schema({
    approveProductComment:{
        type: String,
        default: true
    },
    approveDevotionalComment:{
        type: String,
        default: true
    },
    approveCounsellorComment:{
        type: String,
        default: true
    },
    approveLiveStreamingComment:{
        type: String,
        default: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('SermonSetting', SermonSettingSchema);