const express = require("express");
const router = express.Router();
const { authorizeUpdated} = require("../../middleware/authJwt");

const {allListings} = require("../../controllers/FamilyProcesses/myListings");

router.get("/", allListings);

module.exports = router;
