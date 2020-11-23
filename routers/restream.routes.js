const express = require('express');
const router = express.Router();
const streamController = require('../controllers/restream.controller');

router
.route('/stream')
.get(streamController.startStream);


router
.route('/callback1')
.get(streamController.callback1);

router
.route('/callback2')
.get(streamController.callback2);

router
.route('/stream2')
.post(streamController.stream2)


module.exports = router;
