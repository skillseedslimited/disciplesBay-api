const express = require('express');
const router = express.Router();
const userMangementController = require('../controllers/userMangement.controller');

router
.route('/counter')
.get(userMangementController.counter);



module.exports = router
