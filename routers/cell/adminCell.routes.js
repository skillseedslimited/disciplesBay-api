const express = require("express");
const router = express.Router();
const { authorizeUpdated} = require("../../middleware/authJwt");
const {
  getAll, 
  createNew, 
  getOne,
  editOne, 
  deleteOne, 
  assignLeader,
  addMembers,
  allMembers,
  notInCell,
  removeMember
} = require("../../controllers/cell/cell.controller")


// ================ Create New Cell ===============
router.route("/create")
  .post(createNew);


// ================ Get All Cells =================
router.route("/")
  .get(getAll)


// ================ Get Single Cell ===============
router.route("/single-cell/:id")
  .get(getOne);


// ================ Edit Single Cell ===============
router.route("/edit-cell/:id")
  .put(editOne);


// ================ Delete Single Cell ===============
router.route("/delete-cell/:id")
  .delete(deleteOne);


// ================ Assign Cell Leader ===============
router.route("/assign-leader/:id")
  .get(assignLeader);


// ================ Add Single Member ===============
router.route("/add-members/:id")
  .post(addMembers);


// ================ Get all Cell Members of Single Cell ===============
router.route("/all-members/:id")
  .get(allMembers);


// ================ All users not in a cell ===============
router.route("/not-in-cell/")
  .get(notInCell);


// ================ All users not in a cell ===============
router.route("/remove-member/:id")
  .put(removeMember);

module.exports = router;