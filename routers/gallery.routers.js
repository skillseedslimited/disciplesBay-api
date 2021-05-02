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
.route('/single_gallery/:id')
.get(galleryController.getSingleGallery);

// @route post /delete_gallery
// @desc get single gallery
// @access Private
router
.route('/delete_gallery/:id')
.delete(galleryController.deleteGallery);

router
.route('/delete-single-image')
.get(galleryController.deleteSingleImage);

router
.route('/add-image')
.post(galleryController.addImage);



module.exports = router