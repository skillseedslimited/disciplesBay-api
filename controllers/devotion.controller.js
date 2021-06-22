const Devotion = require('../models/Devotion');
const asyncHandler = require("../middleware/async");
const moment = require('moment');
const ErrorResponse = require("../utils/errorResponse.js");
const NotificationAction = require("../Actions/NotificationActions");

const createDevotion = asyncHandler(async(req, res, next) => {
    const devotion = await Devotion.create(req.body);
    res.status(200).json({
        success: true,
        message: "Devotion created successfully",
        data: devotion
    });
    let title = devotion.title;
    // NotificationAction.sendToGeneral(
    //     `A new devotion: (${title}) has just been posted in the app `,
    //     "devotion",
    //     "#",
    //     `${title}`
    // );
});

const getDevotions = asyncHandler(async(req, res, next) => {
    const today = new Date().setHours(23, 59, 59);
    const devotions = await Devotion.find({
        publishDate: {
            "$lte": new Date(moment(today).format('YYYY-MM-DDTHH:mm:ss.SSSZ'))
        }
    }).sort({publishDate: -1});

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

const getAllDevotions = asyncHandler(async(req, res, next) => {
    const devotions = await Devotion.find().sort({publishDate: -1});

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

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::EDITTING DEVOTION::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const editDevotion = asyncHandler(async(req, res, next) =>{
    // const update = req.body;
    const id = req.params.id;
    const options = { new: true };
    // updated = {};

    const devotionFields = {};
    if(req.body.title) devotionFields.title = req.body.title;
    if(req.body.imageUrl) devotionFields.imageUrl = req.body.imageUrl;
    if(req.body.audioUrl) devotionFields.audioUrl = req.body.audioUrl;
    if(req.body.videoUrl) devotionFields.videoUrl = req.body.videoUrl;
    if(req.body.text) devotionFields.text = req.body.text;
    if(req.body.time) devotionFields.time = req.body.time;
    if(req.body.publishDate) devotionFields.publishDate = req.body.publishDate;

     await Devotion.findByIdAndUpdate(
        { _id: id }, 
        { $set: devotionFields },
        { new: true }
     )
     .then(devotion =>{
         if(!devotion){
            return next( new ErrorResponse("Unable to update devotion", 404))
         }
        res.status(200).json({
            success: true,
            message: 'updated successfully',
            data: devotion
        })
     })
     .catch(() =>{
        return next( new ErrorResponse("Unable to update devotion", 404))
     })
 })


module.exports = {
    createDevotion,
    getDevotions,
    getDevotionSingle,
    deleteDevotion,
    editDevotion,
    getAllDevotions
}