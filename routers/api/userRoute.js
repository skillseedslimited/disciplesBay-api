const indexController = require('../../controllers/user/index');
const express = require('express');
const router = express.Router();


// router.all('/*', (req, res, next)=>{
//     req.app.locals.layout = 'user';
//     next()
// });

// @route Get /
// @desc adds
// @access Public
router.route('/index')
 .get(indexController.index);


 module.exports = router;