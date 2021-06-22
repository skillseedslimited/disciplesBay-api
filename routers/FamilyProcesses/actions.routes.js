const express = require("express");
const router = express.Router();
const { authorizeUpdated} = require("../../middleware/authJwt");
const { approve, disApprove, deleteItem } = require("../../controllers/FamilyProcesses/actions.controller");

router.route("/approve/:familyProcess/:itemId")
  .get(approve);

router.route("/disapprove/:familyProcess/:itemId")
  .post(disApprove);

router.route("/delete/:familyProcess/:itemId")
  .delete(deleteItem);


module.exports = router; 