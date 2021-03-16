const Feedback  = require('../models/Feedback');
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse.js");
const NotificationAction = require("../Actions/NotificationActions");

module.exports = {
    createFeedback: asyncHandler(async(req, res, next) =>{
        let message = req.body.message;
        let user = req.user._id;
        let newFeedback = new FeedBack({
            message,
            user
        })
        newFeedback.save()
        .then(feedback =>{
            res.status(200).json({
                success:true,
                message:"Feed back sent successfully",
                data:feedback
            })
        })
        .catch(err =>{
            return next( new ErrorResponse(`Unable to send feedback`, 404))
        })
    }),

    getAllFeedback: asyncHandler(async(req, res, next) =>{
        await FeedBack.find()
        .populate({path:'user', select: ['username', 'profilePicture']})
        .then(feedback =>{
            res.status(200).json({
                success:true,
                message:"All feedback fetch successfully",
                data:feedback
            })
        })
        .catch(err =>{
            return next( new ErrorResponse(`Unable to fetch feedback`, 404))
        })
    }),

    getSingleFeedback: asyncHandler(async(req, res, next) =>{
        let id = req.query.id;
        await FeedBack.findById(id)
        .populate({path:'user', select: ['username', 'profilePicture']})
        .then(feedback =>{
            res.status(200).json({
                success:true,
                message:"Feedback fetch successfully",
                data:feedback
            })
        })
        .catch(err =>{
            return next( new ErrorResponse(`Unable to fetch feedback`, 404))
        })
    }),

    deleteFeedback: asyncHandler(async(req, res, next) =>{
        let id = req.query.id;
        await FeedBack.findById(id)
        .then(feedback =>{
            feedback.remove();
            res.status(200).json({
                success:true,
                message:"Feedback deleted successfully",
            })
        })
        .catch(err =>{
            return next( new ErrorResponse(`Unable to delete feedback`, 404))
        })
    })
}