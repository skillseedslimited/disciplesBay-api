const express = require('express');
const router = express.Router();
const { authorize, authorizeUpdated  } = require('../middleware/authJwt');
const eventController = require('../controllers/event.controller');

// @route post /createEvent
// @desc creating events
// @access Private
router
.route('/createEvent')
.post( eventController.createEVent);

router
.route('/getAllEvent')
.get(eventController.getAllEvent);

router
.route('/getSingleEvent/:id')
.get(eventController.getSingleEvent);

router
.route('/deleteEvent/:id')
.delete( eventController.deleteEvent);

router
.route('/editEvent/:id')
.put( eventController.editEvent);

module.exports = router