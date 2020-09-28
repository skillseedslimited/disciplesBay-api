const User = require('../../models/User');
const Role = require('../../models/Role');
const randomString = require('randomstring');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
const mailer = require('../../misc/mailer');
const ErrorResponse = require('../../utils/errorResponse');
const path = require('path');
// config = require('../../config/keys');


module.exports = {
     // :::::::::::::::::::::::::::::::::::::::::::::::::::::::::REGISTRATION:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
     register: async (req, res, next) =>{
        let { username, email, phoneNumber, password, confirmPassword, role } = req.body;
        //checking if user role is valid
        const defaultRole = role ? role : "subscriber";

        const userRole = await Role.findOne({name:defaultRole});
        if(!userRole){
            return next(new ErrorResponse("Invalid role specified", 400))
        }
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
                    role: userRole._id
                });
                // Hash the password and saving new user to database
                // bcrypt.genSalt(10, (err, salt) =>{
                //     bcrypt.hash(newUser.password, salt, (err, hash) => {
                //         newUser.password = hash;

                //     });
                // });
                // //delete confirm password
                newUser.confirmPassword = undefined;
                // ===================sending email message=========================================
                // Create email
                const url = `http://${req.headers.host}/api/v1/verifyGetByEmail/${secretToken}`
                const html = `Hello ${newUser.username},

                <br/>
                <br>
                Please click on the button below to verify your account:
                <br/>
                On the following page:
                <a href="${url}"><h4>VERIFY${url}</h4></a>
                <br><br>
                <strong>All the best!!!</strong>
                `
                // Sending the mail
                mailer.sendEmail('checkycheck@gmail.com', newUser.email, 'Please activate your email', html);
                // =====================end of sending message=====================================
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
    },

    // :::::::::::::::::::::::::::::::::::::::::::::::veryfication by email::::::::::::::::::::::::::::::::::::::::::::::::::::::
    verifyGetByEmail:async (req, res, next) => {
        try {
            const Token = req.params.secretToken;
            // Find acct with matching secret token in the database
            const user = await User.findOne({ secretToken :Token});
            // If the secretToken is invalid
            if(!user) {
                return next(new ErrorResponse("Token is invalid", 400)) 
            }

            // If the secretToken is valid
            user.active = true;
            user.secretToken = "";
            await user.save();
            // res.json({
            //     success: true,
            //     message:'your account has been verified successfully you can now login',
            //     data:user
            // })
            res.sendFile(path.join(__dirname + '/../../templates/confirmationSuccess.html'));
            console.log('user verification successful!!');
        } catch (error) {
            next(error);
        }
    }, 



}