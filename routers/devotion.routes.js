const express = require('express');
const router = express.Router();
const DevotionsController = require('../controllers/devotion.controller');
const { authorize, authorizeUpdated } = require('../middleware/authJwt');
// const { authorize, authorizeUpdated } = require("../middleware/authJwt");

router
.route('/:id')
.get(DevotionsController.getDevotionSingle)
.delete([authorizeUpdated("can-mgt-devotions")], DevotionsController.deleteDevotion)
.put([authorizeUpdated("can-mgt-devotions")], DevotionsController.editDevotion)

router
.route('/')
.post([authorizeUpdated("can-mgt-devotions")], DevotionsController.createDevotion )
.get(DevotionsController.getDevotions)

module.exports = router