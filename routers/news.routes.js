const express = require('express');
const router = express.Router();
const newsController = require('../controllers/news.controller');
const { authorize } = require('../middleware/authJwt');


router
.route('/:id')
// @route delete /delete
// @desc deleting a news
// @access Private
.delete(authorize('admin'), newsController.deleteNews)
// @route Get /getSingleNews
// @desc getting a single news
// @access Public
.get(newsController.getSingleNews);

router
.route('/')
.post(authorize('admin'),  newsController.createNews)
// @route Get /getAllNews
// @desc getting all news
// @access Public 
.get(newsController.getAllNews);



module.exports = router