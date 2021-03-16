const express = require("express");
const router = express.Router();
const { authorizeUpdated} = require("../../middleware/authJwt");
const {getAll, createNew, editOne, deleteOne, singleItem} = require("../../controllers/FamilyProcesses/babyChristianing.controller");

// @route Get CreateNewBabyChristianing
// @route Get GetAllBabyChristianings
// @desc create a new Baby Christianing and get all of them
// @access Public
router.route("/")
  .get(getAll)
  .post(createNew);


// @route Get GetSingleBabyChristianing
// @route Get EditSingleBabyChristianing
// @route Get DeleteSingleBabyChristianing
// @desc Get, Edit and Delete Single Baby Christianing
// @access Public
router.route("/:id")
  .get(singleItem)
  .put(editOne)
  .delete(deleteOne);


module.exports = router;