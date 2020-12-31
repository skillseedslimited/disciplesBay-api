const express = require('express');
const router = express.Router();
const indexController = require('../controllers/profile.controller');

// @route Get and post /index and profile
// @desc adds
// @access Public
router.route('/index')
 .get( indexController.index )
 .put( indexController.profile );

 router
 .route('/logout')
 .get(indexController.logout);


 module.exports = router