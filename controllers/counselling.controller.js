const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse.js");
const User = require("../models/User");

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::GETTING ALL COUNSELLORS::::::::::::::::::::::::::::::::::::::::::::::::::
const counsellorAll = asyncHandler(async (req,res, next) =>{
    console.log("this is role=======>",req.user.role.name)
    User.find({"role.name": 'counsellor'})
    .then(counsellors =>{
        console.log("this is counsellor oh====>>>>", counsellors)
        if(!counsellors){
            return next( new ErrorResponse("Unable to get counsellors", 404))
        }

        res.status(200).json({
            success: true,
            message: 'ALl counsellors',
            data: counsellors
        })
    })
    .catch(err =>{
        return next( new ErrorResponse("Unable to get counsellors..", 404))
    })
});

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::GETTING A SINGLE COUNSELLOR:::::::::::::::::::::::::::::::::::::::::::::::::::::
const counsellorSingle = asyncHandler(async (req, res, next) =>{

    let id = req.params.id;

    User.findOne({_id:id})
    .then(counsellor =>{
        if(!counsellor){
            return next( new ErrorResponse("Unable to find counsellor", 404))
        }

        res.status(200).json({
            success: true,
            message:'Counsellor',
            data:counsellor
        });
    })
    .catch(err =>{
        return next( new ErrorResponse("Unable to find counsellor", 404))
    })
});

module.exports ={
    counsellorAll,
    counsellorSingle
}