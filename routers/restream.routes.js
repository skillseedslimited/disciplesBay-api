const express = require('express');
const router = express.Router();
const streamController = require('../controllers/restream.controller');

router
.route('/stream')
.get(streamController.startStream);


router
.route('/callback')
.get(streamController.callback)


module.exports = router;
