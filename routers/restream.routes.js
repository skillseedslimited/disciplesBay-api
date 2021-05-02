const express = require('express');
const router = express.Router();
const streamController = require('../controllers/restream.controller');

router
.route('/get-stream-user')
.get(streamController.startStream);

router
.route('/generate-stream-key')
.get(streamController.generateStreamKey)

router
.route('/get-user-stream-key')
.get(streamController.getUserStreamKey)



module.exports = router;
