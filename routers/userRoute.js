const indexController = require('../controllers/user/profile');
const express = require('express');
const router = express.Router();
const { verifyToken, authorize } = require('../middlewares/authJwt');


router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'user';
    next()
});

// @route Get /
// @desc adds
// @access Public
router.route('/index')
 .get( verifyToken, indexController.index)
 .post( verifyToken, indexController.profile);


 module.exports = router;