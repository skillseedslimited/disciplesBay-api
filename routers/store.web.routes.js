const express = require("express");
const router = express.Router();
const storeController = require("../controllers/storeweb.controller");
const storePolicies = require("../policies/storePolicies");
const { authorize, authorizeUpdated } = require("../middleware/authJwt");


router.route("/:item/details").get(storeController.webFetchSingleStoreContent);

router.route("/all-store-item").get(storeController.getAllStoreWeb);


router.route("/:item/purchase").post(storeController.webPurchaseStoreItem);

module.exports = router;
