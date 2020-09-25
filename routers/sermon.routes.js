const express = require("express");
const router = express.Router();
const SermonsController = require("../controllers/sermon.controller");
const UserSermonsController = require("../controllers/user_sermon.controller");
const { authorize, authorizeUpdated } = require("../middleware/authJwt");
const sermonPolicies = require("../policies/sermonPolicies");

router.post(
  "/create",
  [authorizeUpdated(["can-mgt-sermons"]), sermonPolicies.validateSermon],
  SermonsController.createSermon
);

router.patch(
  "/:sermon/update",
  [authorizeUpdated(["can-mgt-sermons"]), sermonPolicies.validateSermon],
  SermonsController.updateSermon
);

router.get(
  "/fetch-all",
  [authorizeUpdated(["can-mgt-sermons"])],
  SermonsController.listSermons
);
router.get(
  "/:sermon/fetch",
  [authorizeUpdated(["can-mgt-sermons"])],
  SermonsController.getSermon
);
router.delete("/:sermon/delete", SermonsController.deleteSermon);

router.post(
  "/category/create",
  [
    authorizeUpdated(["can-mgt-sermons"]),
    sermonPolicies.validateSermonCategory,
  ],
  SermonsController.createSermonCategory
);

router.get("/categories", SermonsController.listSermonCategories);

router.patch(
  "/category/:category/update",
  [
    authorizeUpdated(["can-mgt-sermons"]),
    sermonPolicies.validateSermonCategory,
  ],
  SermonsController.updateSermonCategory
);

router.get(
  "/category/:category/fetch",
  [authorizeUpdated(["can-mgt-sermons"])],
  SermonsController.updateSermonCategory
);

router.delete(
  "/category/:category/delete",
  [authorizeUpdated(["can-mgt-sermons"])],
  SermonsController.deleteSermonCategory
);

router.delete(
  "/category/:category/delete",
  [authorizeUpdated(["can-mgt-sermons"])],
  SermonsController.deleteSermonCategory
);

router.get("/user/sermons", UserSermonsController.fetchUserSermons);

module.exports = router;
