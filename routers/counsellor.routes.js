const express = require('express');
const router = express.Router();
const counsellorController = require('../controllers/counselling.controller');


router
.route('/get-all-counselor')
.get(counsellorController.getCounselor)
// @route /
// @desc getting all counsellors
// @access private.
// router
// .route('/category/:cat')
// .get(counsellorController.category);

// @route /
// @desc getting all counsellors
// @access private.
// router
// .route('/change-status')
// .get(counsellorController.status)


// @route /
// @desc getting all counsellors
// @access private
// router
// .route('/counselor/:status/:cat')
// .get(counsellorController.counsellorAll);

// @route /
// @desc getting all counsellors
// @access private.
// router
// .route('/:id')
// .get(counsellorController.counsellorSingle);




module.exports = router;
