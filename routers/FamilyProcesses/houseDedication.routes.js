const express = require("express");
const router = express.Router();
const { authorizeUpdated} = require("../../middleware/authJwt");
const {getAll, createNew, editOne, deleteOne, singleItem} = require("../../controllers/FamilyProcesses/houseDedication.controller");

// @route Get CreateNewHouseDedication
// @route Get GetAllHouseDedications
// @desc create a new House Dedication and get all of them
// @access Public
router.route("/")
  .get(getAll)
  .post(createNew);

// @route Get CreateNewHouseDedication
// @route Get GetAllHouseDedications
// @desc create a new House Dedication and get all of them
// @access Public
router.route("/:id")
  .get(singleItem)
  .put(editOne)
  .delete(deleteOne);


module.exports = router;