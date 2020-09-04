const indexController = require('../controllers/profile.controller');
const testimonyController = require('../controllers/testimony.controller');
const NewsController = require('../controllers/news.controller');
const express = require('express');
const router = express.Router();
const { verifyToken, authorize } = require('../middleware/authJwt');


router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'user';
    next()
});

// @route Get and post /index and profile
// @desc adds
// @access Public
router.route('/index')
 .get( indexController.index )
 .post( indexController.profile );


 // @route post and get /
// @desc adds
// @access Public
router
.route('/testimony')
.post(testimonyController.testimonyPost)
.get(testimonyController.testimonyGet);


// @router /deleteTestimony
// @desc delete testimony
// @access private
router
.route('/deleteTestimony/:id')
.delete(testimonyController.deleteTestimony);


 module.exports = router;