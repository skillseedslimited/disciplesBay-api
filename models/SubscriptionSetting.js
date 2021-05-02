const mongoose = require('mongoose');

const SubscriptionSettingSchema = new mongoose.Schema({
    price:{
        type: Number,
        required: true
    },
    duration:{
        type: Number,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('SubscriptionSetting', SubscriptionSettingSchema);