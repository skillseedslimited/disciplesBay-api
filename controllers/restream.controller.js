const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse.js");
const Restream = require('../models/restream');
const url = require('url'); 
const randomString = require('randomstring');
const User = require('../models/User');

module.exports = {
    // ::::::::::::::::::::::::::::::::::::::::::::::::::START STREAM::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    startStream: asyncHandler(async(req, res, next) =>{

        if(req.query.streams){
            let streams = JSON.parse(req.query.streams);
            let query = {$or: [streams]};
            for (let stream in streams) {
                if (!streams.hasOwnProperty(stream)) continue;
                query.$or.push({stream_key : stream});
            }
 
            User.find(query,(err, users) => {
                if (err)
                    return;
                if (users) {
                    res.json(users);
                }
            });
        }
    }),
// :::::::::::::::::::::::::::::::::::::::::::::::::GENERATING STREAM KEY:::::::::::::::::::::::::::::::::::::::::::::::::
    generateStreamKey: asyncHandler(async(req, res, next) =>{
        let user = req.user._id;

        await User.findById(user)
        .then(user =>{
            const stream_key = randomString.generate({length:5, charset:'numeric'});
            user.stream_key = stream_key;
            user.save()
            .then(user =>{
                res.status(200).json({
                    success: true,
                    message: 'Stream key generated successfully',
                    data: user
                })
            })
            .catch(err =>{
                return next(new ErrorResponse(`Unable to save stream key ${err}`, 400)) 
            })
        })
        .catch(err =>{
            return next(new ErrorResponse("Unable to generate stream key", 400)) 
        })

    }),
    getUserStreamKey: asyncHandler(async(req, res, next) =>{
        let user = req.user._id;

        await User.findById(user)
        .then(user =>{
            res.status(200).json({
                success:true,
                message:'Your streaming key',
                data:user.stream_key
            })
        })
    })
}