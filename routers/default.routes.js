const defaultController = require('../controllers/default/index.controller');
const registerController = require('../controllers/default/register.controller');
const testimonyController = require('../controllers/testimony.controller');
const newsController = require('../controllers/news.controller');
const express = require('express');
const login = require('../controllers/default/login.controller');
const router = express.Router();


router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'default';
    next()
});

// @route Get /
// @desc adds
// @access Public
router
.route('/')
.get(defaultController.index);


// @route post
// @desc authenticate user
// @access Public
router
.post('/auth/register', registerController.register)
.post('/auth/login', login);

// @route Get verifyGetByEmail
// @desc verify user by email
// @access Public    
router
.route('/verifyGetByEmail/:secretToken')
.get(registerController.verifyGetByEmail); 


// @route Get /testimony
// @desc view testimony
// @access Public 
router
.route('/testimony')
.get(testimonyController.testimonyAll);

// @route Get /testimonySingle
// @desc getting a single testimony
// @access public
router
.route('/testimonySingle/:id')
.get(testimonyController.testimonySingle);

// @route Get /getAllNews
// @desc getting all news
// @access Public 
router
.route('/getAllNews')
.get(newsController.getAllNews);

// @route Get /getSingleNews
// @desc getting a single news
// @access Public
router
.route('/getSingleNews/:id')
.get(newsController.getSingleNews);







 module.exports = router;