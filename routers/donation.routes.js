const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donation.controller");
const authorizeUpdated = require("../middleware/authJwt").authorizeUpdated;
const DonationPolicy = require("../policies/donationPolicies");
router
  .route("/all")
  .get(
    [authorizeUpdated("can-mgt-donations")],
    donationController.fetchAllDonations
  );

router
  .route("/create-partnership")
  .post(
    [DonationPolicy.validatePartnershipCreation,authorizeUpdated("can-mgt-donations")],
    donationController.createPartnership
  );

router
  .route("/:partnership/update-partnership")
  .put(
    [authorizeUpdated("can-mgt-donations")],
    donationController.updatePartnership
  );

router
  .route("/:partnership/delete-partnership")
  .delete(
    [authorizeUpdated("can-mgt-donations")],
    donationController.deletePartnership
  );

router
  .route("/fetch-all-partnerships")
  .get(
    [authorizeUpdated("can-mgt-donations")],
    donationController.listPartnerShips
  );
router
  .route("/fetch-active-partnerships")
  .get(
    [authorizeUpdated("can-mgt-donations")],
    donationController.fetchActivePartnership
  );

/****user */

router.route("/user/all").get(donationController.fetchUserDonations);

router
  .route("/user/fetch-active-partnerships")
  .get(donationController.fetchUserActivePartnership);

router.route("/user/give-donation").post(donationController.giveDonation);

router
  .route("/user/:partnership/give-partnership-donation")
  .post(donationController.subscribeToPartnership);

module.exports = router;
