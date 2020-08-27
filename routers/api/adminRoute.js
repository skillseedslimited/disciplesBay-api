const indexController = require('../../controllers/admin/index');
const express = require('express');
const router = express.Router();


router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'admin';
    next()
});

// @route Get /
// @desc adds
// @access Public
router.route('/admin')
 .get(indexController.index);


 module.exports = router;