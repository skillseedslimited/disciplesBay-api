const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse.js");
const Department = require('../models/Department');

module.exports = {
    // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::CREATE DEPARTMENT::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    createDepartment: asyncHandler(async(req, res, next) =>{
        let {
            name,
            street,
            state,
            country,
            HOD
        } = req.body;

        let newDepartment  = new Department({
            name,
            street,
            state,
            country,
            HOD
        })
        newDepartment.save()
        .then(department =>{
            res.status(200).json({
                success: true,
                message:'department created successfully',
                data:department
            })
        })
        .catch(err =>{
            return next(new ErrorResponse("Unable to create department", 404));
        })
    }),
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::DELETE DEPARTMENT:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    deletedDepartment: asyncHandler(async(req, res, next) =>{
        let id = req.query.id;
        await Department.findById(id)
        .then(department =>{
            department.remove();

            res.status(200).json({
                success:true,
                message:'Department deleted successfully',
                data: null
            })
        })
        .catch(err =>{
            return next(new ErrorResponse("Unable to delete department", 404));
        })
    }),
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::GET ALL DEPARTMENT::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    allDepartment: asyncHandler(async(req, res, next) =>{
        await Department.find()
        .then(department =>{
            res.status(200).json({
                success: true,
                message: 'All department',
                data: department
            })
        })
        .catch(err =>{
            return next(new ErrorResponse("Unable to get all department", 404));
        })
    }),
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::GET SINGLE DEPARTMENT::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    singleDepartment: asyncHandler(async(req, res, next) =>{
        let id = req.query.id;
        await Department.findById(id)
        .then(department =>{
            res.status(200).json({
                success: true,
                message:"Single department",
                data:department
            })
        })
        .catch(err =>{
            return next(new ErrorResponse("Unable to get single department", 404));
        })
    }),
    // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::EDIT BRANCH:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
    editDepartment: asyncHandler(async(req, res, next) =>{
        const department = req.query.id;
    const options = { new: true };
    
    const departmentFields = {};
    if(req.body.name) departmentFields.name = req.body.name;
    if(req.body.street) departmentFields.street = req.body.street;
    if(req.body.state) departmentFields.state = req.body.state;
    if(req.body.country) departmentFields.country = req.body.country;
    if(req.body.HOD) departmentFields.HOD = req.body.HOD;



     await  Department.findByIdAndUpdate(
        { _id: department }, 
        { $set: departmentFields },
        { new: true }
     )
     .then(department =>{
         if(!branch){
            return next( new ErrorResponse("Unable to update department", 404))
         }
        res.status(200).json({
            success: true,
            message: 'updated successfully',
            data: department
        })
     })
     .catch(() =>{
        return next( new ErrorResponse("Unable to update branch", 404))
     })
    })

}
