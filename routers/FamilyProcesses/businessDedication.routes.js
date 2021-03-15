const express = require("express");
const router = express.Router();
const { authorizeUpdated} = require("../../middleware/authJwt");
const {getAll, createNew, editOne, deleteOne} = require("../../controllers/FamilyProcesses/businessDedication.controller");

router.route("/")
  .get(getAll)
  .post(createNew);

router.route("/:id")
  .put(editOne)
  .delete(deleteOne);


module.exports = router;