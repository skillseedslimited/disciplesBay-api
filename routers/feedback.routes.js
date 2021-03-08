const FeedbackController = require('../controllers/feedback.controller');
const express = require('express');
const router = express.Router();
const { authorize, authorizeUpdated  } = require('../middleware/authJwt');

router
.route("/create")
.post(FeedbackController.createFeedback);

router
.route("/fetch-all")
.get(FeedbackController.getAllFeedback);

router
.route("/fetch-single")
.get(FeedbackController.getSingleFeedback);

router
.route("/delete")
.delete(FeedbackController.deleteFeedback);

module.exports = router;