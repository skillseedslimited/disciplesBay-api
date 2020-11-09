const express = require('express');
const router = express.Router();
const DevotionsController = require('../controllers/devotion.controller');
const { authorize, authorizeUpdated } = require('../middleware/authJwt');
// const { authorize, authorizeUpdated } = require("../middleware/authJwt");

router
.route('/:id')
.get(DevotionsController.getDevotionSingle)
.delete(DevotionsController.deleteDevotion)
.put(DevotionsController.editDevotion)

router
.route('/')
.post(DevotionsController.createDevotion )
.get(DevotionsController.getDevotions)

// fgf?
module.exports = router