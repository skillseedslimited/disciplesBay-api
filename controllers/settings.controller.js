const TestimonySetting = require('../models/TestimonySetting');
// const SubscriptionSeting = require('../models/SubscriptionSetting');
// const SermonSetting = require('../models/SermonSetting');
// const ContentSetting = require('../models/CommentSetting')
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse.js");


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

    TestimonySetting.findOneAndUpdate({ _id: testimony[0].id }, { $set: req.body }, { new: true });

    return res.status(200).json({
        success: true,
        message: "Testimony setting Updated",
        data: testimony
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
module.exports = {
    getTestimonySetting,
    updateTestimonySetting,
    createTestimonySetting
}

