const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse.js");

const strartStream = asyncHandler(async(req, res, next) =>{
    
    let client_id = req.user._id;
    let response_type=code;
    let redirect_uri = redirect
    let state= [random, opaque, token]
})