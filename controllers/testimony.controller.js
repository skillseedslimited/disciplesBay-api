const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse.js");
const Testimony = require('../models/Testimony');
const User = require('../models/User');



// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::CREATING USER TESTIMONY:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const testimonyPost = async (req, res, next) =>{
    
    // GETTING TESTIMONY BODY AND ANONYMOUS FROM USER
    let {
        testimonyBody,
        anonymous
    } = req.body;

    // GETTING USER PICTURE, USERNAME AND ID FROM LOGIN USER
    let picture = req.user.picture;
    let username = req.user.username;
    let user = req.user._id;

   
    // CREATING NEW INSTANCE OF THE USER
    let newTestimony = new Testimony({
        testimonyBody,
        anonymous,
        picture,
        username,
        user
    });

    // SAVING USER TO DATABASE
    newTestimony.save()
        .then(testimony =>{
        res.status(200).json({
            success: true,
            message: 'testimony created successfully, please wait for your testimony to be aprrove.',
            data: testimony
        })
    })
    .catch(err => res.status(400).json(err));

}

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::GETTING USER TESTIMOIES::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const testimonyGet = (req, res) =>{

    // FINDING USER 
    User.findOne({ user: req.user.id})
    .then(user =>{

        // FINDING TESTIMONIES OF USER
        Testimony.find({user: req.user._id})
        .sort({date: -1})
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

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::GETTING ALL USERS TESTIMONIES::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const testimonyAll = (req, res) =>{

    // FINDING ALL TESTIMONIES
    Testimony.find({status: true})
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


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::EXPORTING ALL FUNCTIONS::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
module.exports = {
    testimonyPost,
    testimonyGet,
    testimonyAll,
    testimonyActive,
    deleteTestimony,
    testimonySingle
}