const TestimonySetting = require('../models/TestimonySetting');
const SubscriptionSetting = require('../models/SubscriptionSetting');
const SermonSetting = require('../models/SermonSetting');
const CommentSetting = require('../models/CommentSetting')
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse.js");

// TESTIMONY SETTINGS CONTROLLERS ==================================================================================
const getTestimonySetting = asyncHandler(async(req, res, next) => {

    const testimony = await TestimonySetting.find();

    if(!testimony[0]){
        return res.status(200).json({
            success: true,
            message: "No settings have been set for testimony",
            data: []
        })
    }

    return res.status(200).json({
        success: true,
        message: "Testimony settins found",
        data: testimony
    })
});


const updateTestimonySetting = asyncHandler(async(req, res, next) => {
    const testimony = await TestimonySetting.find();

    if(!testimony[0]){
        return res.status(200).json({
            success: true,
            message: "No settings have been set for testimony",
            data: []
        })
    }

    const updateSetting = await TestimonySetting.findOneAndUpdate({ _id: testimony[0].id }, { $set: req.body }, { new: true });

    return res.status(200).json({
        success: true,
        message: "Testimony setting Updated",
        data: updateSetting
    })
});


const createTestimonySetting = asyncHandler(async(req, res, next) => {
    const settings = await TestimonySetting.find();
    if(settings[0]){
        return res.status(400).json({
            success: false,
            message: "Testimony Settings already exist, please update instead",
            data: settings[0]
        })
    }

    const testimony = await TestimonySetting.create(req.body);

    return res.status(200).json({
        success: true,
        message: "Testimony Setting created successfully",
        data: testimony
    });
})

//SUBSCRIPTION SETTING CONTROLLERS =========================================================================================================
const getSubscriptionSetting = asyncHandler(async(req, res, next) => {

    const subscription = await SubscriptionSetting.find();

    if(!subscription[0]){
        return res.status(200).json({
            success: true,
            message: "No settings have been set for Subscription",
            data: []
        })
    }

    return res.status(200).json({
        success: true,
        message: "Subscription settings found",
        data: subscription
    })
});


const updateSubscriptionSetting = asyncHandler(async(req, res, next) => {
    const subscription = await SubscriptionSetting.find();

    if(!subscription[0]){
        return res.status(200).json({
            success: true,
            message: "No settings have been set for Subscription",
            data: []
        })
    }

    const updateSettings = await SubscriptionSetting.findOneAndUpdate({ _id: subscription[0].id }, { $set: req.body }, { new: true });

    return res.status(200).json({
        success: true,
        message: "Subscription setting Updated",
        data: updateSettings
    })
});

const createSubscriptionSetting = asyncHandler(async(req, res, next) => {
    const settings = await SubscriptionSetting.find();
    if(settings[0]){
        return res.status(400).json({
            success: false,
            message: "Subscription Settings already exist, please update instead",
            data: settings[0]
        })
    }

    const subscription = await SubscriptionSetting.create(req.body);

    return res.status(200).json({
        success: true,
        message: "Subscription Setting created successfully",
        data: subscription
    });
})

//SERMON SETTING CONTROLLERS =========================================================================================================
const getSermonSetting = asyncHandler(async(req, res, next) => {

    const sermon = await SermonSetting.find();

    if(!sermon[0]){
        return res.status(200).json({
            success: true,
            message: "No settings have been set for Sermon",
            data: []
        })
    }

    return res.status(200).json({
        success: true,
        message: "Sermon settings found",
        data: sermon
    })
});


const updateSermonSetting = asyncHandler(async(req, res, next) => {
    const sermon = await SermonSetting.find();

    if(!sermon[0]){
        return res.status(200).json({
            success: true,
            message: "No settings have been set for Sermon",
            data: []
        })
    }

    const updateSettings = await SermonSetting.findOneAndUpdate({ _id: sermon[0].id }, { $set: req.body }, { new: true });

    return res.status(200).json({
        success: true,
        message: "Sermon setting Updated",
        data: updateSettings
    })
});


const createSermonSetting = asyncHandler(async(req, res, next) => {
    const settings = await SermonSetting.find();
    if(settings[0]){
        return res.status(400).json({
            success: false,
            message: "Sermon Settings already exist, please update instead",
            data: settings[0]
        })
    }

    const sermon = await SermonSetting.create(req.body);

    return res.status(200).json({
        success: true,
        message: "Sermon Setting created successfully",
        data: sermon
    });
})


//COMMENT SETTING CONTROLLERS =========================================================================================================
const getCommentSetting = asyncHandler(async(req, res, next) => {

    const comment = await CommentSetting.find();

    if(!comment[0]){
        return res.status(200).json({
            success: true,
            message: "No settings have been set for comment",
            data: []
        })
    }

    return res.status(200).json({
        success: true,
        message: "Comment settings found",
        data: comment
    })
});


const updateCommentSetting = asyncHandler(async(req, res, next) => {
    const comment = await CommentSetting.find();

    if(!comment[0]){
        return res.status(200).json({
            success: true,
            message: "No settings have been set for Comment",
            data: []
        })
    }

    const updateSettings = await CommentSetting.findOneAndUpdate({ _id: comment[0].id }, { $set: req.body }, { new: true });

    return res.status(200).json({
        success: true,
        message: "Comment setting Updated",
        data: updateSettings
    })
});


const createCommentSetting = asyncHandler(async(req, res, next) => {
    const settings = await CommentSetting.find();
    if(settings[0]){
        return res.status(400).json({
            success: false,
            message: "Comment Settings already exist, please update instead",
            data: settings[0]
        })
    }

    const comment = await CommentSetting.create(req.body);

    return res.status(200).json({
        success: true,
        message: "Comment Setting created successfully",
        data: comment
    });
})
module.exports = {
    getTestimonySetting,
    updateTestimonySetting,
    createTestimonySetting,

    getCommentSetting,
    updateCommentSetting,
    createCommentSetting,

    getSermonSetting,
    updateSermonSetting,
    createSermonSetting,

    getSubscriptionSetting,
    updateSubscriptionSetting,
    createSubscriptionSetting
}

