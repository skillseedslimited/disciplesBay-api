const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse.js");
const Restream = require('../models/restream');
const url = require('url'); 
const randomString = require('randomstring');

module.exports = {
    // ::::::::::::::::::::::::::::::::::::::::::::::::::START STREAM::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    startStream: asyncHandler(async(req, res, next) =>{
        let client_id = '9d3f64e3-d792-4828-9723-c0c4bf5eb055';
        let response_type= 'code';
        let redirect_uri = "http://localhost:3100/api/v1/restream/callback"
        let state = randomString.generate();
        let newRestream  = new Restream({
            client_id,
            response_type,
            redirect_uri,
            state
        })

        newRestream.save()
        .then(stream =>{

            res.redirect(url.format({
                pathname:"https://api.restream.io/login",
                query: {
                    "response_type": response_type,
                    "client_id": client_id,
                    "redirect_uri":redirect_uri,
                    "state":state
                    }
                    
                }));
                console.log(`https://api.restream.io/login/${response_type}/${client_id}/${redirect_uri}/${state}`)
                
        })
    }),
    callback: asyncHandler(async(req, res, next) =>{
        // console.log('i got here', req.query)
        let {
            code,
            scope,
            state
        } = req.query
        console.log("code", code)
        console.log("scope", scope)
        console.log("state", state)
    })
}