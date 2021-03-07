const express = require("express");
const router = express.Router();
const storeController = require("../controllers/store.controller");
const storePolicies = require("../policies/storePolicies");
const { authorize, authorizeUpdated } = require("../middleware/authJwt");

router.route("/all").get(storeController.fetchAllStoreContents);

router.route("/:item/details").get(storeController.fetchSingleStoreContent);

router
  .route("/:item/update")
  .put(
    [authorizeUpdated("can-mgt-store"), storePolicies.validateStoreUpdate],
    storeController.updateStoreContent
  );
router.route("/:item/purchase").post(storeController.purchaseStoreItem);

router
.route("/gift")
.get(storeController.gift);

module.exports = router;
