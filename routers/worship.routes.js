const express = require("express");
const router = express.Router();
const WorshipController = require("../controllers/worship.controller");
const UserSermonsController = require("../controllers/user_sermon.controller");
const { authorize, authorizeUpdated } = require("../middleware/authJwt");
const sermonPolicies = require("../policies/sermonPolicies");

router.post(
  "/create",
//   [authorizeUpdated(["can-mgt-sermons"]), sermonPolicies.validateSermon],
  WorshipController.createWorship
);

router.put(
  "/:worshipContent/update",
  
  WorshipController.updateWorship
);

router.get(
  "/fetch-all",
  WorshipController.listWorship
);
router.get(
  "/:worshipContent/fetch",
//   [authorizeUpdated(["can-mgt-sermons"])],
  WorshipController.getWorship
);
router.delete("/:worshipContent/delete", WorshipController.deleteWorship);

router.post(
  "/category/create",
  [
    // authorizeUpdated(["can-mgt-sermons"]),
    sermonPolicies.validateSermonCategory,
  ],
  WorshipController.createWorshipCategory
);

router.get("/categories", WorshipController.listWorshipCategories);

router.patch(
  "/category/:category/update",
  [
    // authorizeUpdated(["can-mgt-sermons"]),
    sermonPolicies.validateSermonCategory,
  ],
  WorshipController.updateWorshipCategory
);

router.get(
  "/category/:category/fetch",
//   [authorizeUpdated(["can-mgt-sermons"])],
  WorshipController.fetchSingleWorshipCategory
);

router.delete(
  "/category/:category/delete",
//   [authorizeUpdated(["can-mgt-sermons"])],
  WorshipController.deleteWorshipCategory
);

// router.get("/user/sermons", UserSermonsController.fetchUserSermons);

// router.get("/featured-sermon",SermonsController.featuredSermons);
// router.get("/un-featured-sermon",SermonsController.unFeaturedSermons);

// router.get("/get-featured-sermon", SermonsController.getFeaturedSermon);

router.get("/get-all", WorshipController.getWorshipWithNoLimit);

router.get("/admin-worship", WorshipController.getAdminWorship);

module.exports = router;
