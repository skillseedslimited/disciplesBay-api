const express = require("express");
const router = express.Router();
const SermonsController = require("../controllers/sermon.controller");
const { authorize, authorizeUpdated } = require("../middleware/authJwt");

router.post(
  "/create",

  SermonsController.createSermon
);

router.post(
  "/category/create",
  [authorizeUpdated(["can-mgt-sermons"])],
  SermonsController.createSermonCategory
);
module.exports = router;
