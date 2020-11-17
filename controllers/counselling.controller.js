const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse.js");
const User = require("../models/User");
const Role = require('../models/Role');

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::GETTING ALL COUNSELLORS::::::::::::::::::::::::::::::::::::::::::::::::::
const counsellorAll = asyncHandler(async (req,res, next) =>{
    // finding counsellor role and saving in a veriable
    let counsel  = await Role.findOne({name: 'counsellor'});


    // finding all users with role of counsellor
    User.find({role: counsel})
    .populate({
        path: 'role',
        match: {name: {$gte: 'counsellor'}},
        select: 'name'
    })
    .then(counsellors =>{
        
        res.status(200).json({
            success: true,
            message: 'All counsellors',
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