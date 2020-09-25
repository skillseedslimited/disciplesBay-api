const express = require('express');
const router = express.Router();
const { authorize } = require('../middleware/authJwt');
const eventController = require('../controllers/event.controller');
// @route post /createEvent
// @desc creating events
// @access Private
router
.route('/createEvent')
.post(authorize('admin'), eventController.createEVent);

router
.route('/getAllEvent')
.get(eventController.getAllEvent);

router
.route('/getSingleEvent/:id')
.get(eventController.getSingleEvent);

router
.route('/deleteEvent/:id')
.delete(authorize('admin'), eventController.deleteEvent);

router
.route('/editEvent/:id')
.put(authorize('admin'), eventController.editEvent);

module.exports = router