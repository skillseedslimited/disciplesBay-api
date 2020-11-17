const CounsellorCat = require('../models/counselloreCat');
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse.js");
const counselloreCat = require('../models/counselloreCat');

// ::::::::::::::::::::::::::::::::::::::::::::::::CREATE COUNSELLOR CAT :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const createCat = asyncHandler(async(req, res, next) =>{
    
    let catType = req.body.catType;

    newscunsellorCat = new CounsellorCat({
        catType
    })

    newscunsellorCat.save()
    .then(counselloreCat =>{
        res.status(200).json({
            success: true,
            message: 'Counselor category created successfully',
            data: counselloreCat
        })
    })
    .catch(err =>{
        return next( new ErrorResponse("Unable to create counselor category", 404))
    })

})


// ::::::::::::::::::::::::::::::::::::::::::::::::::::GET ALL COUNSELLOR CAT ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const getAllCounsellorCat = asyncHandler(async(req, res, next) =>{
    
    await CounsellorCat.find()
    .then(counselloreCat =>{
        if(!counselloreCat){
            return next( new ErrorResponse("Unable to get counselor category", 404))
        }

        res.status(200).json({
            success: true,
            message: 'All counselor categories',
            data: counselloreCat
        })
    })
    .catch(err =>{
        return next( new ErrorResponse("Unable to get counselor category", 404))
    })
})

// ::::::::::::::::::::::::::::::::::::::::::::::::::GET SINGLE COUNSELLOR CAT:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const getSingleCounsellorCat = asyncHandler(async(req, res, next) =>{
    // get cat id
    let id  = req.params.id;

    await CounsellorCat.findById(id)
    .then(counselloreCat =>{
        if(!counselloreCat){
            return next( new ErrorResponse("Unable to get counselor category", 404))
        }

        res.status(200).json({
            success: true,
            message: 'All counselor categories',
            data: counselloreCat
        })

    })
    .catch(err =>{
        return next( new ErrorResponse("Unable to get counselor category", 404))
    })
})

// ::::::::::::::::::::::::::::::::::::::::::::::::DELETE COUNSELLOR CAT:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const deleteCounsellorCat = asyncHandler(async(req, res, next) =>{
    let id = req.params.id;

    await CounsellorCat.findById(id)
    .then(counselloreCat =>{
        if(!counselloreCat){
            return next( new ErrorResponse("Unable to get counselor category", 404))
        }

        counselloreCat.remove();

        res.status(200).json({
            success: true,
            message: 'Counselor category deleted successfully',
            data: null
        })
    })
})


module.exports = {
    createCat,
    getAllCounsellorCat,
    getSingleCounsellorCat,
    deleteCounsellorCat
}
