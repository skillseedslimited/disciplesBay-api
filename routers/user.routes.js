const indexController = require('../controllers/profile.controller');
const express = require('express');
const router = express.Router();
const { verifyToken, authorize } = require('../middleware/authJwt');


router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'user';
    next()
});

// @route Get /
// @desc adds
// @access Public
router.route('/index')
 .get( indexController.index )
 .post( indexController.profile );


 module.exports = router;