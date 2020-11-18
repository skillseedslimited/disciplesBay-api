const express = require('express');
const router = express.Router();
const counsellorController = require('../controllers/counselling.controller');


// @route /
// @desc getting all counsellors
// @access private.
router
.route('/change-status')
.get(counsellorController.status)


// @route /
// @desc getting all counsellors
// @access private
router
.route('/:status')
.get(counsellorController.counsellorAll);

// @route /
// @desc getting all counsellors
// @access private.
router
.route('/:id')
.get(counsellorController.counsellorSingle);




module.exports = router;
