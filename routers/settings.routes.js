const express = require('express');
const router = express.Router();
const SettingsController = require('../controllers/settings.controller');
const { authorize } = require('../middleware/authJwt');

router
.route('/testimony/')
.get(SettingsController.getTestimonySetting)
.put(SettingsController.updateTestimonySetting)
.post(SettingsController.createTestimonySetting);

router
.route('/subscription/')
.get(SettingsController.getSubscriptionSetting)
.put(SettingsController.updateSubscriptionSetting)
.post(SettingsController.createSubscriptionSetting)

router
.route('/sermon/')
.get(SettingsController.getSermonSetting)
.put(SettingsController.updateSermonSetting)
.post(SettingsController.createSermonSetting)

router
.route('/comment/')
.get(SettingsController.getCommentSetting)
.put(SettingsController.updateCommentSetting)
.post(SettingsController.createCommentSetting)

module.exports = router