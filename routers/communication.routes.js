const express = require('express');
const router = express.Router();
const communication = require('../controllers/communication.controller');
const {authorizeUpdated} = require("../middleware/authJwt");


router
.route('/settings')
.get([authorizeUpdated("can-mgt-communications")],communication.fetchCommuncationSettings);

router
.route('/settings/:settings/update')
.put([authorizeUpdated("can-mgt-communications")],communication.updateCommunicationSettings);
 
router
.route('/initiate-call')
.post(communication.initiateCall);

router
.route('/:log_id/receive-call')
.put(communication.receiveCall);

router
.route('/:log_id/end-call')
.put(communication.callEnd);
module.exports = router;
 