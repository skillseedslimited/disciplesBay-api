const express = require('express');
const router = express.Router();
const { authorize } = require('../middleware/authJwt');
const galleryController = require('../controllers/gallery.controller');


// @route post /creategallery
// @desc creating gallery
// @access Private
router
.route('/creategallery')
.post(galleryController.createGallery);

// @route post /getallgallery
// @desc get gallery
// @access Private
router
.route('/getallgallery')
.get(galleryController.getAllGallery);

// @route post /getsinglegallery
// @desc get single gallery
// @access Private
router
.route('getsinglegallery/:id')
.get(galleryController.getSingleGallery);

// @route post /getsinglegallery
// @desc get single gallery
// @access Private


module.exports = router