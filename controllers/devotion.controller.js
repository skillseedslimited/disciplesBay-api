const Devotion = require('../models/Devotion');
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse.js");

const createDevotion = asyncHandler(async(req, res, next) => {
    const devotion = await Devotion.create(req.body);
    return res.status(200).json({
        success: true,
        message: "Devotion created Successfully",
        data: devotion
    });
});

const getDevotions = asyncHandler(async(req, res, next) => {

    const devotions = await Devotion.find();

    if(!devotions[0]){
        return res.status(200).json({
            success: true,
            message: "No Devotions have been posted",
            data: []
        })
    }

    return res.status(200).json({
        success: true,
        message: "Devtions Found",
        data: devotions
    })
});

const getDevotionSingle = asyncHandler(async(req, res, next) => {

    const devotion = await Devotion.findById(req.params.id);

    if(!devotion) next(new ErrorResponse("Devotion not found", 404));

    return res.status(200).json({
        success: true,
        message: "Devtion Found",
        data: devotion
    })
});

const deleteDevotion = asyncHandler( async(req, res, next) =>{
    // finding devotion by ID
    const devotion = await Devotion.findById(req.params.id)
    
    if(!devotion) next( new ErrorResponse('no devotion with this id', 404));

    devotion.remove();

    res.status(200).json({
        success: true,
        message: 'devotion successfully deleted'
    })
});


module.exports = {
    createDevotion,
    getDevotions,
    getDevotionSingle,
    deleteDevotion
}