const Gallery = require('../models/Gallery');
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse.js");
const { deleteTestimony } = require('./testimony.controller');

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::CREATE GALLERY:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const createGallery = asyncHandler(async(req, res, next)=> {
    let {
        images,
        coverImage,
        title,
        date
    } = req.body;

    let newGallery = new Gallery({
        title,
        images,
        coverImage,
        date
    })

    newGallery.save()
    .then(gallery =>{
        if(!gallery){
            res.status({
                success: false,
                message: 'Unable to save gallery',
                data: null
            })
        }
        res.status(200).json({
            success: true,
            message: 'Gallery created successfully',
            data: gallery
        })
    })
    .catch(err =>{
        return next( new ErrorResponse("Unable to create gallery", 404))
    })
})
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::GET ALL GALLERY::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const getAllGallery = asyncHandler(async(req, res, next) =>{

    await Gallery.find()
    .sort({_id: -1})
    .then(gallery =>{
        if(!gallery){
            return next( new ErrorResponse("Unable to find gallery", 404))
        }

        res.status(200).json({
            success: true,
            message:'All gallery',
            data: gallery
        })
    })
})

// :::::::::::::::::::::::::::::::::::::::::::::::GET SINGLE GALLARY::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const getSingleGallery = asyncHandler(async(req, res, next) =>{
    // getting gallery id
    let id  = req.params.id;

    await Gallery.findById(id)
    .then(gallery =>{
        if(!gallery){
            return next( new ErrorResponse("Unable to find gallery", 404))
        }

        res.status(200).json({
            success: true,
            message:'Gallery',
            data: gallery
        })
    })
})

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::EDIT GALLERY::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const editGallery = asyncHandler(async(req, res, next) =>{
        const id = req.params.id;
    const options = { new: true };
    // updated = {};
    const galleryFields = {};
    if(req.body.image) galleryFields.image = req.body.image;


    await Gallery.findByIdAndUpdate(
        { _id: id }, 
        { $set: galleryFields },
        { new: true }
    )
    .then(gallery =>{
        if(!gallery){
            return next( new ErrorResponse("Unable to update gallery", 404))
        }
        res.status(200).json({
            success: true,
            message: 'updated successfully',
            data: gallery
        })
    })
    .catch(() =>{
        return next( new ErrorResponse("Unable to update gallery", 404))
    })
})

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::DELETE GALLERY:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const deletegallery = asyncHandler(async(req, res, next) =>{

    let id  = req.params.id;

    await Gallery.findById(id)
    .then(gallery =>{
        if(!gallery){
            return next( new ErrorResponse("Unable to find gallery", 404))
        }

        gallery.remove();
        
        res.status(200).json({
            success: true,
            message: 'Gallery deleted successfully',
            data: null
        })
    })
})



// :::::::::::::::::::::::::::::::::::::::::::::::::::::::EXPORTING ALL FUNCTIONS::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
module.exports = {
    createGallery,
    getAllGallery,
    getSingleGallery,
    editGallery,
    deletegallery
}