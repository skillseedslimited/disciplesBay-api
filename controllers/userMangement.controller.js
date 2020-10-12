const User  =  require('../models/User');
const Role = require('../models/Role');
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse.js");


// ::::::::::::::::::::::::::::::::::::::::::::::::::GETTING ALL USER::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const getAllUsers = asyncHandler(async (req, res, next) =>{

    // finding all user
    await User.find()
    .populate({
        path: 'role',
        match: {name: {$gte: 'counsellor'}},
        select: 'name'
    })
    .then(users =>{
        if(!users){
            return next( new ErrorResponse('No users at the moment', 404))
        }

        res.status(200).json({
            success: true,
            message: 'All user',
            data: users
        });
    })
    .catch(err =>res.status(404).json({
        success:false,
        message:'Unable to get users',
        data: {}
    }));
});

// ::::::::::::::::::::::::::::::::::::::::::::::::::GETTING SINGLE USER::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const getSingleUser = asyncHandler(async (req, res, next) =>{
    // getting user id
    const id = req.params.id;
    
    // finding single user
    await User.findById({_id:id})
    .then(user =>{
        if(!user){
            return next( new ErrorResponse('No user with this id', 404))
        }

        res.status(200).json({
            success:true,
            message: 'Single user',
            data: user
        });
    })
    .catch(err =>res.status(404).json({
        success: false,
        message:'Unable to get user',
        data: {}
    }));
});

// :::::::::::::::::::::::::::::::::::::::::::::::::::DELETING USER:::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const deleteUser = asyncHandler(async (req, res, next) =>{

    // getting user id
    const id  = req.params.id;

    // finding user
    await User.findById({_id:id})
    .then(user =>{
        if(!user){
            return next( new ErrorResponse('No user with this id', 404))
        }

        // deleting user
        user.remove();

        res.status(200).json({
            success: true,
            message:'User successfully deleted'
        });

    })
    .catch(err =>res.status(404).json({
        success: false,
        message: 'No user with this id',
        data: err
    }))
})

// :::::::::::::::::::::::::::::::::::::::::::::::::::SUSPENDING USER:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const suspendUser = asyncHandler(async (req, res, next) =>{

    // getting user id
    const id  = req.params.id;

    // finding user
    await User.findById({_id:id})
    .then(async user =>{
        if(!user){
            return next( new ErrorResponse('No user with this id', 404))
        }

        // setting user to inactive
        user.active  = false;
        
        // saving user to database
        await user.save()
        .then(user =>{
            res.status(200).json({
                success: true,
                message: 'User successfully suspended',
                data: user
            })
        })
        .catch(err =>res.status(404).json({
            success:false,
            message: 'Unable save user',
            data: err
        }))
    })
    .catch(err =>res.status(404).json({
        success:false,
        message: 'Unable to suspend user',
        data: err
    }))
})
// :::::::::::::::::::::::::::::::::::::::::::::UNSUSPENDING USER::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const unsuspendUser = asyncHandler(async (req, res, next) =>{

    // getting user id
    const id  = req.params.id;

    // finding user
    await User.findById({_id:id})
    .then(async user =>{
        if(!user){
            return next( new ErrorResponse('No user with this id', 404))
        }

        // setting user to inactive
        user.active  = true;
        
        // saving user to database
        await user.save()
        .then(user =>{
            res.status(200).json({
                success: true,
                message: 'User successfully unsuspended',
                data: user
            })
        })
        .catch(err =>res.status(404).json({
            success:false,
            message: 'Unable save user',
            data: err
        }))
    })
    .catch(err =>res.status(404).json({
        success:false,
        message: 'Unable to unsuspend user',
        data: err
    }))
})

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::ASIGN USER AS COUNSELLOR::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const assignUser = asyncHandler(async(req, res, next) =>{
    
    // find role id
    let roleId = req.params.roleId;

    let userId = req.params.userId;

    // finding role
    let role = await Role.findById(roleId);

    if(!role){
        return next( new ErrorResponse('No role with this id ohh', 404))
    }

    await User.findById(userId)
    .then(user =>{
        if(!user){
            return next( new ErrorResponse('No user with this id', 404))
        }

        user.role = role;

        user.save()
        .then(user =>{
            res.status(200).json({
                success: true,
                message:'User successfully assign',
                data: user
            })
        })
    }) 



    
})

module.exports = {
    getAllUsers,
    getSingleUser,
    deleteUser,
    suspendUser,
    unsuspendUser,
    assignUser
}