const express = require('express');
const router = express.Router();
const DevotionsController = require('../controllers/devotion.controller');
const { authorize } = require('../middleware/authJwt');

router
.route('/:id')
.get(DevotionsController.getDevotionSingle)
.delete(authorize('admin'), DevotionsController.deleteDevotion)
.put(DevotionsController.editDevotion)

router
.route('/')
.post(authorize('admin'), DevotionsController.createDevotion )
.get(DevotionsController.getDevotions)

module.exports = router