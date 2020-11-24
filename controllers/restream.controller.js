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
        let redirect_uri = "http://localhost:3100/api/v1/restream/callback1"
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
// :::::::::::::::::::::::::::::::::::::::::::::::::::::STREAM CALLBACK:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    callback1: asyncHandler(async(req, res, next) =>{
        console.log('i got here', req.query)
        console.log('work');
        let {
            code,
            scope,
            state
        } = req.query
        console.log("code", code)
        console.log("scope", scope)
        console.log("state", state)

        await Restream.findOne({state: state})
        .then(state =>{

            state.code = code;
            state.save;
            res.json({
                success: true,
                data:state
            })
            
            // let grant_type =  'authorization_code'
            // let redirect_uri = 'http://localhost:3100/api/v1/restream/callback2'
            // let client_id = '9d3f64e3-d792-4828-9723-c0c4bf5eb055';
            // let client_secret = 'def7f0ad-d967-48d8-9029-54085181b701'
            // code

            // res.redirect(url.format({
            //     pathname:"https://api.restream.io/oauth/token",
            //     query: {
            //         "grant_type": grant_type,
            //         "redirect_uri":redirect_uri,
            //         "code":code,
            //         "client_id": client_id,
            //         "client_secret":client_secret
            //         }
                    
            //     }));

        })
        .catch(err =>{
            return next( new ErrorResponse("Unable to find a stream", 404))
        })
    }),
    stream2:asyncHandler(async(req, res, next) =>{
        // console.log(req.query)

        
            let grant_type =  'authorization_code'
            let redirect_uri = 'http://localhost:3100/api/v1/restream/callback1'
            let client_id = '9d3f64e3-d792-4828-9723-c0c4bf5eb055';
            let client_secret = '34a71a5b-8fc7-49d6-8c55-f941b649e1d5'
            
            // res.json("welcome dear")
            // res.redirect('https://api.restream.io/oauth/token')
            res.redirect(url.format({
                pathname:"https://api.restream.io/oauth/token",
                query: {
                    "grant_type": grant_type,
                    "redirect_uri":redirect_uri,
                    "code":'171e1744ffe99bf430a9ccaa35aff242dc6e919b'
                    }
                    
                }))
                .catch(err => res.json({err}));
    }),
    callback2: asyncHandler(async(req, res, next) =>{
        console.log('calback2', req.query)
    })
}