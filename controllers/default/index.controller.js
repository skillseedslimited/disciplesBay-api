const asyncHandler = require("../../middleware/async");
const ErrorResponse = require("../../utils/errorResponse");
const User = require('../../models/User');
const randomString = require('randomstring');
const mailer = require('../../misc/mailer');
const bcrypt = require('bcryptjs');

module.exports = {
    index: (req, res) => {
        res.json('welcome to the index page');
    },

    // :::::::::::::::::::::::::::::::::::::::::::::::::::COLLECT FORGET PASSWORD EMAIL:::::::::::::::::::::::::::::::::::::::::::::::::
    valEmail:asyncHandler(async(req, res, next) => {
        let email = req.body.email;
        await User.findOne({email})
        .then(async user =>{
            if(!user){
                return next( new ErrorResponse("Unable to find user with this email", 404))
            }

            // Generation of secret token and saving to the database
            const resetPasswordToken = randomString.generate({length:5, charset:'numeric'});
            user.resetPasswordToken = resetPasswordToken;
            
            // ===================sending email message=========================================
                // Create email
                const html = `Hello ${user.username},

                <br/>
                <br>
                use the TOKEN to change your password:
                <br/>
                TOKEN:${resetPasswordToken}
                <br><br>
                <strong>All the best!!!</strong>
                `
                // Sending the mail
                mailer.sendEmail('checkycheck@gmail.com', user.email, 'Please activate your email', html);
                // =====================end of sending message=====================================

                await user.save()
                .then(save =>{
                    res.status(200).json({
                        success: true,
                        message:"An email have been sent to you",
                        data:null
                    })
                })
                .catch(err =>{
                    return next( new ErrorResponse("Unable to find user with this email", 404))
                })
        })
        .catch(err =>{
            return next( new ErrorResponse("Unable to find user with this email", 404))
        })
    }),
    // ::::::::::::::::::::::::::::::::::::::::::::::::verify reset password token::::::::::::::::::::::::::::::::::::::::::::::::::::
    verifyToken: asyncHandler(async(req, res, next) =>{
        let resetPasswordToken  = req.body.resetPasswordToken;
        await User.findOne({resetPasswordToken})
        .then(user =>{
            user.resetPasswordToken =undefined;
            user.save()
            .then(user =>{
                res.status(200).json({
                    success: true,
                    message:'Token verify successfully',
                    data:user
                })
            })
            .catch(err =>{
                return next( new ErrorResponse("Unable to verify token", 404))
            })
        })
        .catch(err =>{
            return next( new ErrorResponse("Unable to find user with this token", 404))
        })
    }),
    // :::::::::::::::::::::::::::::::::::::::::::::::CHANGE PASSWORD:::::::::::::::::::::::::::::::::::::::::::::::::::::::
    changePassword:asyncHandler(async(req, res, next) =>{
        let id  = req.query.id;
        let password = req.body.password;
        let confirmPassword = req.body.confirmPassword
        await User.findById(id)
        .then(user =>{
            if ((confirmPassword) && (password !== confirmPassword)) {
                return next(new ErrorResponse("Passwords do not match", 400))              
            }
            // hashing password
            const pass = bcrypt.hashSync(password, 10);
            user.password = pass;
            user.save()
            .then(user =>{
                res.status(200).json({
                    success: true,
                    message:"Password change successfully",
                    data:null
                })
            })
        })
    })
}