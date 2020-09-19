const express = require('express');
const router = express.Router();
const SettingsController = require('../controllers/settings.controller');
const { authorize } = require('../middleware/authJwt');

router
.route('/testimony/')
.get(SettingsController.getTestimonySetting)
.put(SettingsController.updateTestimonySetting)
.post(SettingsController.createTestimonySetting)

module.exports = router