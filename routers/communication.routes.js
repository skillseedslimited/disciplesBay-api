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
.route('/receive-call')
.put(communication.receiveCall);

router
.route('/end-call')
.put(communication.callEnd);

 
router
.route('/request-counsellor')
.post(communication.requestCounsellor);

router
.route('/fetch-requests')
.get(communication.getAllRequest);


router
.route('/:counsellor_request/update-requests')
.put(communication.manageRequest);

// [authorizeUpdated('can-mgt-counsellor-requests')],
// anotheone

router
.route('/user-chat-list')
.get(communication.fetchUserChatLst);

router
.route('/:chat/messages')
.get(communication.fetchChatMessages);

router
.route('/send-message')
.post(communication.sendChatMessage);

module.exports = router;
 