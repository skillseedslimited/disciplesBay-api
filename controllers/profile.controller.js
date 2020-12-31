const Profile = require('../models/Profile');
const User = require('../models/User');
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse.js");


module.exports = {
    index:asyncHandler(async (req, res, next) =>{

        
        User.findOne({_id:req.user._id})
            .populate({
                path: 'role',
                match: {name: {$gte: 'counsellor'}},
                select: 'name'
            })
            .then(profile => {
                if(!profile){
                    return next( new ErrorResponse(`Unable profile profile! ${err}`, 404))
                }
                res.status(200).json({
                    success: true,
                    message: 'user profile',
                    data: profile
                });
            })
            .catch(err => {
                return next( new ErrorResponse(`Unable profile profile!! ${err}`, 404))
            });

    }),
 //::::::::::::::::::::::::::::::::::::::::::::::::::::::LOGOUT::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 logout:asyncHandler(async(req, res, next) =>{
    let id = req.user._id;
    await User.findById(id)
    .then(user =>{
        user.isOnline = false;
        user.save()
        .then(user =>{
            res.status(200).json({
                success: true,
                message:"Logout successfully",
                data:user
            })
        })
        .catch(err =>{
            return next( new ErrorResponse(`Unable to logout ${err}`, 404))
        })
    })
    .catch(err =>{
        return next( new ErrorResponse("Unable to logout", 404))
    })
 }),
// :::::::::::::::::::::::::::::::::::::::::::::::CREATE PROFILE::::::::::::::::::::::::::::::::::::::::::
    profile:asyncHandler( (req, res, next) =>{
        let id = req.user._id;
        User.findById(id)
        .populate('role')
        .then(async user =>{
            console.log(user)
            if(!user){
                return next( new ErrorResponse("Unable find user", 404))
            }
            const profileFields = {};
            if(req.body.address) profileFields.address = req.body.address;
            if(req.body.department) profileFields.department = req.body.department;
            if(req.body.maritalStatus) profileFields.maritalStatus = req.body.maritalStatus;
            if(req.body.sex) profileFields.sex = req.body.sex;
            if(req.body.occupation) profileFields.occupation = req.body.occupation;
            if(req.body.familyMembers) profileFields.familyMembers = req.body.familyMembers;
            if(req.body.campus) profileFields.campus = req.body.campus;
            if(req.body.profilePicture) profileFields.profilePicture = req.body.profilePicture;
            if(req.body.fullName) profileFields.fullName = req.body.fullName;
            if(req.body.phoneNumber) profileFields.phoneNumber = req.body.phoneNumber

            await User.findByIdAndUpdate(
                { _id: id }, 
                { $set: profileFields },
                { new: true }
            )
            .populate('role')
            .then(profile =>{
                if(!profile){
                    return next( new ErrorResponse("Unable to update profile", 404))
                }
                res.status(200).json({
                    success: true,
                    message: 'updated successfully',
                    data: profile
                })
            })
            .catch(() =>{
                return next( new ErrorResponse("Unable to update profile", 404))
            })
            
        })
        .catch(err =>{
            return next( new ErrorResponse("Unable to create profile", 404))
        })
        
         // get fields
        //  const profileFields = {};
        //  profileFields.user = req.user._id;
        //  username = req.user
        //  if(req.body.address) profileFields.address = req.body.address;
        //  if(req.body.department) profileFields.department = req.body.department;
        //  if(req.body.maritalStatus) profileFields.maritalStatus = req.body.maritalStatus;
        //  if(req.body.sex) profileFields.sex = req.body.sex;
        //  if(req.body.occupation) profileFields.occupation = req.body.occupation;
        //  if(req.body.familyMembers) profileFields.familyMembers = req.body.familyMembers;
 
        //  Profile.findOne({ user: req.user._id })
        //      .then(profile =>{
        //          if(profile){
        //              // update
        //              Profile.findOneAndUpdate(
        //                  { user: req.user._id }, 
        //                  { $set: profileFields },
        //                  { new: true }
        //                  )
        //                  .then(profile =>  res.status(200).json({
        //                      success:true,
        //                      message:'user profile updated',
        //                      data: profile
        //                  }));
        //          }else{
        //              // create
        //              new Profile(profileFields).save()
        //              .then(profile =>{
        //                  res.status(200).json({
        //                      success: true,
        //                      message:'profile created successfully',
        //                      data: profile
        //                  })
        //                  console.log(profile);
        //              });
 
        //          }
        //      })
    })
}

