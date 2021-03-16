const express = require("express");
const router = express.Router();
const { authorizeUpdated} = require("../../middleware/authJwt");
const {getAll, createNew, editOne, deleteOne, singleItem} = require("../../controllers/FamilyProcesses/childDedication.controller");

// @route Get CreateNewChildDedication
// @route Get GetAllChildDedications
// @desc create a new Child Dedication and get all of them
// @access Public
router.route("/")
  .get(getAll)
  .post(createNew);

// @route Get GetSingleChildDedication
// @route Get EditSingleChildDedication
// @route Get DeleteSingleChildDedication
// @desc Get, Edit and Delete Single ChildDedication
// @access Public
router.route("/:id")
  .get(singleItem)
  .put(editOne)
  .delete(deleteOne);


module.exports = router;