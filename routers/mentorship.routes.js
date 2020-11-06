const express = require('express');
const router = express.Router();
const mentorshipController = require('../controllers/mentorship.controller');
const { authorizeUpdated} = require("../middleware/authJwt");

router
.route('/create')
.post([authorizeUpdated("can-mgt-mentorship")],mentorshipController.createMentorshipCategory);

router
.route('/:mentorship_cat_id/update')
.put([authorizeUpdated("can-mgt-mentorship")],mentorshipController.updateMentorshipCategory);

router
.route('/:mentorship_cat_id/fetch')
.get(mentorshipController.fetchSingleMentorshipCategory);

router
.route('/fetch/all')
.get(mentorshipController.fetchAllMentorshipCategories);

router
.route('/:mentorship_cat_id/delete')
.delete([authorizeUpdated("can-mgt-mentorship")],mentorshipController.deleteMentorshipCategories);

router
.route('/level/:mentorship_cat_id/create')
.post([authorizeUpdated("can-mgt-mentorship")],mentorshipController.createMentorshipLevel);

router
.route('/level/:level/update')
.put([authorizeUpdated("can-mgt-mentorship")],mentorshipController.updateMentorshipLevel);

router
.route('/level/:level/fetch-single')
.get(mentorshipController.updateMentorshipLevel);

router
.route('/level/:mentorship_cat_id/fetch')
.get(mentorshipController.fetchAllMentorshipLevel);

router
.route('/level/:level/delete')
.delete([authorizeUpdated("can-mgt-mentorship")],mentorshipController.deleteMentorshipLevel);

router
.route('/subscription/create')
.post([authorizeUpdated("can-mgt-mentorship")],mentorshipController.createMentorshipSubscription);


router
.route('/subscription/:mentorship_subscription_id/update')
.put([authorizeUpdated("can-mgt-mentorship")],mentorshipController.updateMentorshipSubscription);


router
.route('/subscription/:mentorship_sub_id/fetch')
.get(mentorshipController.findSinglementorshipSubscription);

router
.route('/subscription/:mentorship_sub_id/delete')
.delete([authorizeUpdated("can-mgt-mentorship")],mentorshipController.deleteMentorshipSubscription);


router
.route('/subscription/:level/fetch-level-subs')
.get(mentorshipController.fetchAllLevelMentorshipSubscription);

router
.route('/user/subscription/subscribe')
.post(mentorshipController.subscribeUserPackage);

router
.route('/user/subscription/list')
.get(mentorshipController.fetchUserSubscriptions);

module.exports = router