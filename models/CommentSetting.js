const mongoose = require('mongoose');

const CommentSettingSchema = new mongoose.Schema({
    approveProductComment:{
        type: Boolean,
        default: true
    },
    approveDevotionalComment:{
        type: Boolean,
        default: true
    },
    approveCounsellorComment:{
        type: Boolean,
        default: true
    },
    approveLiveStreamingComment:{
        type: Boolean,
        default: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('CommentSetting', CommentSettingSchema);