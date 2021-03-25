const express = require("express");
const router = express.Router();
const { authorizeUpdated} = require("../../middleware/authJwt");
const {getAll, createNew, editOne, deleteOne, singleItem} = require("../../controllers/FamilyProcesses/weddingDedication.controller");

router.route("/")
  .get(getAll)
  .post(createNew);

router.route("/:id")
  .get(singleItem)
  .put(editOne)
  .delete(deleteOne);


module.exports = router;