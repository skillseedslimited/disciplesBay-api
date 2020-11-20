const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse.js");
const Restream = require('../models/restream');

// const startStream = asyncHandler(async(req, res, next) =>{
    
//     let client_id = req.user._id;
//     let response_type=code;
//     let redirect_uri = redirect
//     let state= req.body..state;
//     // [random, opaque, token]





// })

module.exports = {
    startStream: asyncHandler(async(req, res, next) =>{
        let client_id = req.user._id;
        let response_type=code;
        let redirect_uri = redirect
        let state= req.body..state;
        
        let newRestream  = new Restream({
            client_id,
            response_type,
            redirect_uri,
            state
        })

        newRestream.save()
        .then(stream =>{
            res.status(200).redirect('https://api.restream.io/login?response_type&client_id&redirect_uri&state')
        })
    }),
    callback: asyncHandler(async(req, res, next) =>{

    })
}