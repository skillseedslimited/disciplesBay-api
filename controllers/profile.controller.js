const Profile = require('../models/Profile');


module.exports = {
    index: (req, res) =>{

        
        Profile.findOne({ user: req.user.id })
            .then(profile => {
                if(!profile){
                    return res.status(404).json({
                        success: false,
                        message: 'no profile for this user, please update your profile!'
                    });
                }
                res.status(200).json({
                    success: true,
                    message: 'user profile',
                    data: profile
                });
            })
            .catch(err => res.status(404).json(err.message));

    },

    profile: (req, res) =>{
         // get fields
         const profileFields = {};
         profileFields.user = req.user._id;
         if(req.body.address) profileFields.address = req.body.address;
         if(req.body.department) profileFields.department = req.body.department;
         if(req.body.maritalStatus) profileFields.maritalStatus = req.body.maritalStatus;
         if(req.body.sex) profileFields.sex = req.body.sex;
         if(req.body.occupation) profileFields.occupation = req.body.occupation;
         if(req.body.familyMembers) profileFields.familyMembers = req.body.familyMembers;
 
         Profile.findOne({ user: req.user._id })
             .then(profile =>{
                 if(profile){
                     // update
                     Profile.findOneAndUpdate(
                         { user: req.user._id }, 
                         { $set: profileFields },
                         { new: true }
                         )
                         .then(profile =>  res.status(200).json({
                             success:true,
                             message:'user profile updated',
                             data: profile
                         }));
                 }else{
                     // create
                     new Profile(profileFields).save()
                     .then(profile =>{
                         res.status(200).json({
                             success: true,
                             message:'profile created successfully',
                             data: profile
                         })
                         console.log(profile);
                     });
 
                 }
             })
    }
}

