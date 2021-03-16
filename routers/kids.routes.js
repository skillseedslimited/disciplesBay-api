const express = require("express");
const router = express.Router();
const KidsController = require("../controllers/kids.controller");
const UserSermonsController = require("../controllers/user_sermon.controller");
const { authorize, authorizeUpdated } = require("../middleware/authJwt");
const sermonPolicies = require("../policies/sermonPolicies");

router.post(
  "/create",
//   [authorizeUpdated(["can-mgt-sermons"]), sermonPolicies.validateSermon],
  KidsController.createKids
);

router.put(
  "/:kidsContent/update",
  
  KidsController.updateKids
);

router.get(
  "/fetch-all",
  KidsController.listKids
);
router.get(
  "/:kidsContent/fetch",
//   [authorizeUpdated(["can-mgt-sermons"])],
  KidsController.getKids
);
router.delete("/:kidsContent/delete", KidsController.deleteKids);

router.post(
  "/category/create",
  [
    // authorizeUpdated(["can-mgt-sermons"]),
    sermonPolicies.validateSermonCategory,
  ],
  KidsController.createKidsCategory
);

router.get("/categories", KidsController.listKidsCategories);

router.patch(
  "/category/:category/update",
  [
    // authorizeUpdated(["can-mgt-sermons"]),
    sermonPolicies.validateSermonCategory,
  ],
  KidsController.updateKidsCategory
);

router.get(
  "/category/:category/fetch",
//   [authorizeUpdated(["can-mgt-sermons"])],
  KidsController.fetchSingleKidsCategory
);

router.delete(
  "/category/:category/delete",
//   [authorizeUpdated(["can-mgt-sermons"])],
  KidsController.deleteKidsCategory
);

// router.get("/user/sermons", UserSermonsController.fetchUserSermons);

// router.get("/featured-sermon",SermonsController.featuredSermons);
// router.get("/un-featured-sermon",SermonsController.unFeaturedSermons);

// router.get("/get-featured-sermon", SermonsController.getFeaturedSermon);

router.get("/get-all", KidsController.getKidsWithNoLimit);

router.get("/admin-kids", KidsController.getAdminKids);

module.exports = router;
