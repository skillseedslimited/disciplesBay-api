const express = require('express');
const router = express.Router();
const flutterwaveController = require('../controllers/flutterwave.controller');


router
.route('/')
.post(flutterwaveController.chargeCard);

module.exports = router