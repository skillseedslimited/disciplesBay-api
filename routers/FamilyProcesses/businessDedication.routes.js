const express = require("express");
const router = express.Router();
const { authorizeUpdated} = require("../../middleware/authJwt");
const {getAll, createNew, editOne, deleteOne, singleItem} = require("../../controllers/FamilyProcesses/businessDedication.controller");

// @route Get CreateNewBusinessDedication
// @route Get GetAllBusinessDedications
// @desc create a new Baby Christianing and get all of them
// @access Public
router.route("/")
  .get(getAll)
  .post(createNew);

// @route Get GetSingleBusinessDedication
// @route Get EditSingleBusinessDedication
// @route Get DeleteSingleBusinessDedication
// @desc Get, Edit and Delete Single Baby Christianing
// @access Public
router.route("/:id")
  .get(singleItem)
  .put(editOne)
  .delete(deleteOne);

module.exports = router;