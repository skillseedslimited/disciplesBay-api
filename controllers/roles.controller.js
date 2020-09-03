
const Role = require('../models/Role');
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse.js");
const User = require('../models/User');

const createRole = asyncHandler(async(req, res, next) => {
    const role = await Role.create(req.body);
    return res.status(200).json({
        success: true,
        message: "Role created Successfully",
        data: role
    })
});

const getRoles = asyncHandler(async(req, res, next) => {
    const role = await Role.find();

    if(!role){
        return res.status(200).json({
            success: true,
            message: "No roles have been created",
            data: {}
        })
    }

    return res.status(200).json({
        success: true,
        message: "Roles Found",
        data: role
    })
})


const deleteRole = asyncHandler(async(req, res, next) => {
    //check if role exists
    const role =await Role.findById(req.params.id);
    if(!role){
        return next(new ErrorResponse(`No role with the id of ${req.params.id}`, 404));
    }
    //check if role has been assigned to users
    const users = await User.find({role:req.params.id});
     if(users[0]){
         return next( new ErrorResponse("Unable to delete: Role has users assigned to it", 403))
     }

     await role.remove();

     res.status(200).json({
        success: true,
        message:"Role deleted successfully",
        data: {}
      });
});

module.exports = {
    createRole,
    getRoles,
    deleteRole
}