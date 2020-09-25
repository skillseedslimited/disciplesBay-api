const mongoose = require('mongoose');

const SubscriptionSettingSchema = new mongoose.Schema({
    price:{
        type: String,
        required: true
    },
    duration:{
        type: Number
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('SubscriptionSetting', SubscriptionSettingSchema);