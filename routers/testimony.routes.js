const express = require('express');
const router = express.Router();
const testimonyController = require('../controllers/testimony.controller');

router
.route('/approve/:id')
.post(testimonyController.testimonyActive); 

// @route post and get /approved
// @desc adds
// @access Public
router 
.route('/testimonyApproveAll')
.get(testimonyController.testimonyApproveAll);

// @router /editTestimony
// @desc delete testimony, getting a single testimony
// @access private
router
.route('/edittestimony/:id')
.put(testimonyController.editTestimony);

// @router /deleteTestimony
// @desc delete testimony, getting a single testimony
// @access private
router
.route('/:id')
.delete(testimonyController.deleteTestimony)
.get(testimonyController.testimonySingle)

// @route Get /testimony
// @desc view testimony for a user
// @access Public 
router
.route('/user/:id')
.get(testimonyController.testimonyGet);

 // @route post and get /
// @desc adds
// @access Public
router
.route('/')
.post(testimonyController.testimonyPost)
.get(testimonyController.testimonyAll);

router
.route('/deactivate/:id')
.post(testimonyController.deactivateTestimony);



module.exports = router