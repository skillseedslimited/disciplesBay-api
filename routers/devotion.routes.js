const express = require('express');
const router = express.Router();
const DevotionsController = require('../controllers/devotion.controller');
const { authorize } = require('../middleware/authJwt');

router
.route('/')
.post(authorize('admin'), DevotionsController.createDevotion )

module.exports = router