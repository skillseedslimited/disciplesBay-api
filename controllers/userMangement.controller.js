const User  =  require('../models/User');
const Sermon = require('../models/Sermon');
const Purchased = require('../models/UserSermon');
const Giving  = require('../models/Donation');
const Role = require('../models/Role');
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse.js");
const randomString = require('randomstring');
const bcrypt = require('bcryptjs');


// ::::::::::::::::::::::::::::::::::::::::::::::::::GETTING ALL USER::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const getAllUsers = asyncHandler(async (req, res, next) =>{

    // finding all user
    await User.find()
    .populate({
        path: 'role',
        match: {name: {$gte: 'counsellor'}},
        select: 'name'
    })
    .sort({_id: -1})
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
    let CounselorCat  = req.body.counselorCat;
    let description = req.body.description;
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
        user.counselorCat = CounselorCat;
        user.description = description;

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

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::CREATE USER:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const createUser = asyncHandler( async(req, res, next) =>{
    let { username, email, phoneNumber, password, confirmPassword, role, fullName, campus } = req.body;
        //checking if user role is valid
        const defaultRole = role ? role : "subscriber";

        const userRole = await Role.findOne({name:defaultRole});
        if(!userRole){
            return next(new ErrorResponse("Invalid role specified", 400))
        }
        // setting isonline to be true
        let isOnline = true;
        // Checking the database if username is taken
        await User.findOne({ email }, async(err, user) => {
            // If username is taken  
            if (user) {
                console.log('username already exists')
               return  next(new ErrorResponse("Email already exists", 400))   
            }else{
                 // Comparison of passwords
                if ((confirmPassword) && (password !== confirmPassword)) {
                    return next(new ErrorResponse("Passwords do not match", 400))              
                }
                // Generation of secret token and saving to the database
                const secretToken = randomString.generate({length:5, charset:'numeric'});
                const pass = bcrypt.hashSync(password, 10);
                let newUser = new User({ 
                    username,
                    email,
                    password: pass, 
                    confirmPassword,
                    secretToken,
                    phoneNumber,
                    campus,
                    fullName,
                    role: userRole._id,
                    isOnline
                });
                // Hash the password and saving new user to database
                // bcrypt.genSalt(10, (err, salt) =>{
                //     bcrypt.hash(newUser.password, salt, (err, hash) => {
                //         newUser.password = hash;

                //     });
                // });
                // //delete confirm password
                newUser.confirmPassword = undefined;
                
                newUser.save()
                    .then(user =>{
                        console.log(user)
                        res.json({
                            success: true,
                            message: 'registration successful, a mail has been sent to you to complete your registration',
                            data: user
                        });
                    })
                    .catch(err =>  next(err));
            }
        });
})

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::EDIT USER::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const editUser = asyncHandler(async(req, res, next) =>{
    // const update = req.body;
    const id = req.query.id;
    const options = { new: true };
    // updated = {};
    const userFields = {};
    if(req.body.username) userFields.username = req.body.username;
    if(req.body.email) userFields.email = req.body.email;
    if(req.body.campus) userFields.campus = req.body.campus;
    if(req.body.fullName) userFields.fullName = req.body.fullName;
    if(req.body.phoneNumber) userFields.phoneNumber = req.body.phoneNumber;
    if(req.body.role) userFields.role = req.body.role;
    if(req.body.department) userFields.department = req.body.department;
    if(req.body.maritalStatus) userFields.maritalStatus = req.body.maritalStatus;
    if(req.body.sex) userFields.sex = req.body.sex;
    if(req.body.occupation) userFields.occupation = req.body.occupation;
    if(req.body.profilePicture) userFields.profilePicture = req.body.profilePicture;
    if(req.body.address) userFields.address = req.body.address;
    if(req.body.fullName) userFields.fullName = req.body.fullName;
    if(req.body.phoneNumber) userFields.phoneNumber = req.body.phoneNumber;


     await User.findByIdAndUpdate(
        { _id: id }, 
        { $set: userFields },
        { new: true }
     )
     .then(user =>{
         if(!user){
            return next( new ErrorResponse("Unable to update user", 404))
         }
        res.status(200).json({
            success: true,
            message: 'updated successfully',
            data: user
        })
     })
     .catch(() =>{
        return next( new ErrorResponse("Unable to update user", 404))
     })
})

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::GET USERS WITH A PARTICULAR ROLE:::::::::::::::::::::::::::::::::::::::::::
const getUserByRole = asyncHandler(async(req, res, next) =>{
    let id = req.query.id;
    await User.find({role: id})
    .then(user =>{
        res.status(200).json({
            success: true,
            message: 'Users under this role',
            data:user
        })
    })
    .catch(err =>{
        return next(new ErrorResponse("Unable to get user", 400))
    })
})

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::COUNTER OF SCHEMAS:::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const counter = asyncHandler(async(req, res, next) =>{

    let giving  = await Giving.count();
    let users = await User.count();
    let sermon = await Sermon.count();
    let purchased =  await Purchased.count();

    res.status(200).json({
        success: true,
        message: "Counters",
        data: {
            'giving':giving,
            'users':users,
            'sermons': sermon,
            'purchased':purchased
        }
    })

})

module.exports = {
    getAllUsers,
    getSingleUser,
    deleteUser,
    suspendUser,
    unsuspendUser,
    assignUser,
    createUser,
    getUserByRole,
    editUser,
    counter
}