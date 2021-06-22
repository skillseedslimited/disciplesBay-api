const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse.js");
const Testimony = require('../models/Testimony');
const User = require('../models/User');
const TestimonyCategory = require("../models/TestimonyCategory");



// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::CREATING USER TESTIMONY:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const testimonyPost = async (req, res, next) => {
    
    // GETTING TESTIMONY BODY AND ANONYMOUS FROM USER
    let {
        testimonyBody,
        anonymous,
        mediaURL,
        mediaType,
        imageUrl,
        videoUrl,
        category,
        subject
    } = req.body;

    // let cat = await TestimonyCategory.findById(category);

    // if(!cat){
    //     return res.status(400).json({
    //         success:false,
    //         message:"No such category"
    //     }) 
    // } 

    // GETTING USER PICTURE, USERNAME AND ID FROM LOGGEDIN USER
    let picture = req.user.profilePicture;
    let username = req.user.username;
    let user = req.user._id;

    
    // CREATING NEW INSTANCE OF THE USER
    let newTestimony = new Testimony({
        testimonyBody,
        anonymous,
        picture,
        username,
        user,
        mediaType,
        mediaURL,
        videoUrl,
        imageUrl,
        category,
        subject
    });

    // SAVING USER TO DATABASE
    newTestimony.save()
        .then(testimony => { 
        res.status(200).json({
            success: true,
            message: 'Testimony submited Successfully, awaiting approval.',
            data: testimony
        })
    })
    .catch(err => res.status(400).json(err));

}

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::EDIT TESTIMONIES::::::::::::::::::::::::::::::::::::::::::::::::::::
const editTestimony = asyncHandler(async(req, res, next) =>{
    const id = req.params.id;
    const options = { new: true };
    // updated = {};
    const testimonyFields = {};
    if(req.body.testimonyBody) testimonyFields.testimonyBody = req.body.testimonyBody;
    if(req.body.imageUrl) testimonyFields.imageUrl = req.body.imageUrl;
    if(req.body.videoUrl) testimonyFields.videoUrl = req.body.videoUrl;

     await Testimony.findByIdAndUpdate( 
        { _id: id }, 
        { $set: testimonyFields },
        { new: true }
     )
     .then(testimony =>{
         if(!testimony){
            return next( new ErrorResponse("Unable to update testimony", 404))
         }
        res.status(200).json({
            success: true,
            message: 'updated successfully',
            data: testimony
        })
     })
     .catch(() =>{
        return next( new ErrorResponse("Unable to update testimony", 404))
     })
})

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::GETTING USER TESTIMOIES::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const testimonyGet = (req, res) =>{

    // FINDING USER 
    User.findOne({ user: req.user.id})
    .then(user =>{

        // FINDING TESTIMONIES OF USER
        Testimony.find({user: req.user._id})
        .sort({date: -1})
        .populate('user')
        .then(testimonies => res.json({
            success: true,
            message: 'user testimony',
            data: testimonies
        }))
        .catch(err => res.status(404).json({
            success: false,
            message: 'no testimony found '
        }));
    })
    .catch(err => res.status(404).json(err));
}


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::GETTING ALL USERS TESTIMONY:::::::::::::::::::::::::::::::::::::::::::::::::::::::
const testimonyAll = (req, res) =>{

    // FINDING ALL TESTIMONIES
    Testimony.find()
        .sort({_id: -1})
        .populate('user')
        .then(testimonies =>{
            console.log(testimonies)
            res.json({
                success: true,
                message: 'users testimonies',
                data: testimonies
            })
        })
        .catch(err => res.status(404).json(err));
}
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::GETTING APPROVE ALL USERS TESTIMONIES::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const testimonyApproveAll = (req, res) =>{

    // FINDING ALL TESTIMONIES
    Testimony.find({status: true})
        .sort({_id: -1})
        .populate('user')
        .then(testimonies =>{
            console.log(testimonies)
            res.json({
                success: true,
                message: 'users testimonies',
                data: testimonies
            })
        })
        .catch(err => res.status(404).json(err));
}
 
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::GETTING SINGLE TESTIMONY::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const testimonySingle = (req, res, next) =>{
    // find the testimony
    Testimony.findOne({_id:req.params.id})
    .populate('user')
    .then(test =>{
        if(!test){
            return next( new ErrorResponse('no testimony with this id', 404))
        }

        res.status(200).json({
            success: true,
            message:'restimony',
            data: test
        })
    })
    .catch(err => {
        return next( new ErrorResponse('no testimony with this id', 404))
    });
}

//::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::SETTING USER TESTIMONY TO BE ACTIVE:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const testimonyActive =  (req, res) => {

    Testimony.findOne({_id: req.params.id})
        .then(test =>{
            

                if(!test){
                    res.status(404).json({
                        success: false,
                        message:'no testimony with this id'
                    })
                    return;
                }


                test.status = true;

                test.save()
                .then(test =>{
                    res.status(200).json({
                        success: true,
                        message: 'testimony activated successfully, users will be able to view this testimony',
                        data: test
                    })
                })

            
        })
        .catch(err => res.status(404).json(err))

}

const deactivateTestimony = asyncHandler(async(req, res, next) =>{
    let id = req.params.id;

    await Testimony.findById(id)
    .then(test =>{
        if(!test){
            return next( new ErrorResponse("Unable to find testimony", 404))
        }

        test.status = false;

                test.save()
                .then(test =>{
                    res.status(200).json({
                        success: true,
                        message: 'testimony unactivated successfully',
                        data: test
                    })
                })
    })
    .catch(err =>{
        return next( new ErrorResponse("Unable to find testimony", 404))
    })
})

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::DELETING TESTIMONY:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const deleteTestimony = (req, res, next)=>{
    // find testimony by id
    Testimony.findById({_id: req.params.id})
    .then(test =>{
        if(!test){
            return next( new ErrorResponse('no testimony with this id', 404))
        }

        test.remove();
        console.log('testimony deleted successfully')
        res.status(200).json({
            success: true,
            message: 'testimony deleted successfully'
        })
    })
}
// :::::::::::::::::::::::::::::::::::::::::::::ADD TESTIMONY BY ADMIN:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const testimonyByAdmin = asyncHandler(async(req, res, next) =>{
    let user = req.query.user;
    let {
        testimonyBody,
        anonymous,
        imageUrl,
        videoUrl,
        category,
        subject
    } = req.body;
    let testimonyOwner = await User.findById(user);
    if(!testimonyOwner){
        return res.status(400).json({
            success:false,
            message:"Sorry this user does not exist"
        })
    }
    let username = testimonyOwner.username;
    let picture = testimonyOwner.profilePicture;
    let status = true;
     // CREATING NEW INSTANCE OF THE USER
     let newTestimony = new Testimony({
        testimonyBody,
        anonymous,
        picture,
        username,
        user,
        videoUrl,
        imageUrl,
        status,
        category,
        subject
    });

    // SAVING USER TO DATABASE
    newTestimony.save()
        .then(testimony =>{
        res.status(200).json({
            success: true,
            message: 'Testimony created Successfully.',
            data: testimony
        })
    })
    .catch(err => res.status(400).json({
        success:false,
        message:"Unable to create testimony",
        data:err
    }));
})
// ::::::::::::::::::::::::::::::::::::::::::::::::::create category :::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const createTestimonyCategory = asyncHandler(async(req, res, next) =>{
    let name = req.body.name;
    let newTestimonyCategory = new TestimonyCategory({
        name
    })
    newTestimonyCategory.save()
    .then(category =>{
        res.status(200).json({
            success:true,
            message:"Testimony category created successfully",
            data:category
        })
    })
    .catch(err =>res.status(400).json({
        success:false,
        message:"Unable to create testimony category"
    }))
})
// :::::::::::::::::::::::::::::::::::::::::::::::::get all testimony category::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const getAllTestimonyCategory = asyncHandler(async(req, res, next) =>{
    await TestimonyCategory.find()
    .then(category =>{
        res.status(200).json({
            success: true,
            message:"Testimony category fetch successfully",
            data: category
        })
    })
    .catch(err =>res.status(400).json({
        success:false,
        message:"Unable to get testimony category"
    }))
})
// :::::::::::::::::::::::::::::::::::::::::::::::::::GET SINGLE TESTIMONY CATEGORY::::::::::::::::::::::::::::::::::::::::::::::::::
const getSingleTestimonyCategory = asyncHandler(async(req, res, next) =>{
    let id = req.query.id;
    await TestimonyCategory.findById(id)
    .then(category =>{
        res.status(200).json({
            success:true,
            message:"Testimony category fetch successfully",
            data:category
        })
    })
    .catch(err =>res.status(400).json({
        success:false,
        message:"Unable to fetch testimony category"
    }))
})
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::EDIT TESTIMONY CATEGORY::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const editTestimonyCategory = asyncHandler(async(req, res, next) =>{
    const id = req.query.id;
    const options = { new: true };
    // updated = {};
    const testimonyFields = {};
    if(req.body.name) testimonyFields.name = req.body.name;

     await TestimonyCategory.findByIdAndUpdate(
        { _id: id }, 
        { $set: testimonyFields },
        { new: true }
     )
     .then(testimony =>{
         if(!testimony){
            return next( new ErrorResponse("Unable to update testimony category", 404))
         }
        res.status(200).json({
            success: true,
            message: 'updated successfully',
            data: testimony
        })
     })
     .catch(() =>{
        return next( new ErrorResponse("Unable to update testimony category", 404))
     })
})
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::DELETE TESTIMONY CATEGORY::::::::::::::::::::::::::::::::::::::::::::
const deleteTestimonyCategory = asyncHandler(async(req, res, next) =>{
    let id = req.query.id;
    await TestimonyCategory.findById(id)
    .then(category =>{
        category.remove();
        res.status(200).json({
            success:true,
            message:"Testimony category removed successfully"
        })
    })
    .catch(err =>res.status(400).json({
        success:false,
        message:"Unable to delete testimony category"
    }))
})


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::EXPORTING ALL FUNCTIONS::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
module.exports = {
    testimonyPost,
    testimonyGet,
    testimonyAll,
    testimonyActive,
    deleteTestimony,
    testimonySingle,
    testimonyApproveAll,
    editTestimony,
    deactivateTestimony,
    testimonyByAdmin,
    createTestimonyCategory,
    getAllTestimonyCategory,
    getSingleTestimonyCategory,
    editTestimonyCategory,
    deleteTestimonyCategory
}