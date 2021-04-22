const express = require("express");
const router = express.Router();
const {
  userCell
} = require("../../controllers/cell/cell.controller")


// ================ All single user cell ===============
router.route("/user-cell/")
  .get(userCell);


module.exports = router;