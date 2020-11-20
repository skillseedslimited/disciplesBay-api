const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse.js");
const Branch = require('../models/Branch');

module.exports = {
    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::CREATE BRANCH::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    createBranch: asyncHandler(async(req, res, next) =>{
        let {
            branchName,
            street,
            state,
            country,
            branchPhone,
            admin
        } = req.body;

        let newBranch  = new Branch({
            branchName,
            street,
            state,
            country,
            branchPhone,
            admin
        })

        newBranch.save()
        .then(branch =>{
            res.status(200).json({
                success: true,
                message:'Branch created successfully',
                data:branch
            })
        })
        .catch(err =>{
            return next(new ErrorResponse("Unable to create branch", 404));
        })
    }),
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::DELETE BRANCH:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    deleteBranch: asyncHandler(async(req, res, next) =>{
        let branch = req.query.branch;
        await Branch.findById(branch)
        .then(branch =>{
            branch.remove();

            res.status(200).json({
                success:true,
                message:'Branch deleted successfully',
                data: null
            })
        })
        .catch(err =>{
            return next(new ErrorResponse("Unable to delete branch", 404));
        })
    }),
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::GET ALL BRANCH::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    allBranch: asyncHandler(async(req, res, next) =>{
        await Branch.find()
        .then(branch =>{
            res.status(200).json({
                success: true,
                message: 'All branch',
                data: branch
            })
        })
        .catch(err =>{
            return next(new ErrorResponse("Unable to get all branch", 404));
        })
    }),
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::GET SINGLE BRANCH::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    singleBranch: asyncHandler(async(req, res, next) =>{
        let branch = req.query.branch;
        await Branch.findById(branch)
        .then(branch =>{
            res.status(200).json({
                success: true,
                message:"Single branch",
                data:branch
            })
        })
        .catch(err =>{
            return next(new ErrorResponse("Unable to get single branch", 404));
        })
    }),
    // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::EDIT BRANCH:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    editBranch: asyncHandler(async(req, res, next) =>{
        const branch = req.query.branch;
    const options = { new: true };
    
    const branchFields = {};
    if(req.body.branchName) branchFields.branchName = req.body.branchName;
    if(req.body.street) branchFields.street = req.body.street;
    if(req.body.state) branchFields.state = req.body.state;
    if(req.body.country) branchFields.country = req.body.country;
    if(req.body.admin) branchFields.admin = req.body.admin;
    if(req.body.branchPhone) branchFields.branchPhone = req.body.branchPhone;



     await Branch.findByIdAndUpdate(
        { _id: branch }, 
        { $set: branchFields },
        { new: true }
     )
     .then(branch =>{
         if(!branch){
            return next( new ErrorResponse("Unable to update branch", 404))
         }
        res.status(200).json({
            success: true,
            message: 'updated successfully',
            data: branch
        })
     })
     .catch(() =>{
        return next( new ErrorResponse("Unable to update branch", 404))
     })
    })

}
