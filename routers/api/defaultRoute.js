const defaultController = require('../../controllers/default/index');
const registerController = require('../../controllers/default/register');
const express = require('express');
const router = express.Router();



router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'default';
    next()
});

// @route Get /
// @desc adds
// @access Public
router.route('/')
 .get(defaultController.index);


// @route Get api/users/register
// @desc register user
// @access Public
router.route('/register')
    .post(registerController.register);

// @route Get verifyGetByEmail
// @desc verify user by email
// @access Public    
router.route('/verifyGetByEmail/:secretToken')
    .get(registerController.verifyGetByEmail); 


 module.exports = router;