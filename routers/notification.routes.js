const express = require("express");
const router = express.Router();
const NotificationController = require("../controllers/notification.controller");
const { authorize, authorizeUpdated } = require("../middleware/authJwt");

router.put("/subscribe-user", NotificationController.subscribeUser);

router.get(
  "/fetch-user-notifications",
  NotificationController.fetchUserNotifications
);
 
router.post(
  "/broadcast",
  [authorizeUpdated("can-mgt-notifications")],
  NotificationController.postBroadcast
);

module.exports = router;
