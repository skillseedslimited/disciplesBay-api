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
  
  SermonsController.updateSermon
);

router.get(
  "/fetch-all",
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
  SermonsController.fetchSingleSermonCategory
);

router.delete(
  "/category/:category/delete",
  [authorizeUpdated(["can-mgt-sermons"])],
  SermonsController.deleteSermonCategory
);

router.get("/user/sermons", UserSermonsController.fetchUserSermons);

router.get("/featured-sermon",SermonsController.featuredSermons);
router.get("/un-featured-sermon",SermonsController.unFeaturedSermons);

router.get("/get-featured-sermon", SermonsController.getFeaturedSermon);

router.get("/get-all", SermonsController.getSermonWithNoLimit);

router.get("/admin-sermon", SermonsController.getAdminSermon);

module.exports = router;
