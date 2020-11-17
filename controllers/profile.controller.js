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
                    return next( new ErrorResponse("Unable profile profile", 404))
                }
                res.status(200).json({
                    success: true,
                    message: 'user profile',
                    data: profile
                });
            })
            .catch(err => {
                return next( new ErrorResponse("Unable profile profile", 404))
            });

    }),

    profile:asyncHandler( (req, res, next) =>{

        

        console.log(req.user._id)
        User.findOne({_id:req.user._id})
        .populate({
            path: 'role',
            match: {name: {$gte: 'counsellor'}},
            select: 'name'
        })
        .then(async user =>{
            if(!user){
                return next( new ErrorResponse("Unable find user", 404))
            }

            let  {
                address,
                department,
                maritalStatus,
                sex,
                occupation,
                familyMembers
            } = req.body;

            user.address = address;
            user.department = department;
            user.maritalStatus = maritalStatus;
            user.sex = sex;
            user.occupation = occupation;
            user.familyMembers = familyMembers

            await user.save()
            .then(profile =>res.status(200).json({
                success: true,
                message: 'Profile successfully created',
                data: profile
            }))
            .catch(err =>{
                return next( new ErrorResponse("Unable create profile", 404))
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

