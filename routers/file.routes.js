const express = require('express');
const router = express.Router();
const fileAction = require('../Actions/FileActions');
router
.route('/pre-sign')
.get(fileAction.signUrl);

module.exports = router;
