const express = require("express");
const router = express.Router();
const { authorizeUpdated} = require("../../middleware/authJwt");
const {createNew, getOne, editOne, deleteOne, allMyAppointments} = require("../../controllers/Appointments/userAppointment.controller");

// @route Get AllUserAppoinments
// @desc fetch all user appointments
// @access User
router.route("/my-appointments")
  .get(allMyAppointments);

// @route Post CreateNewAppointment
// @desc create new appointment[]
// @access User
router.route("/new")
  .post(createNew);

// @route DeleteAppointment
// @desc delete single appointment
// @access User
router.route("/:id")
  .get(getOne)
  .put(editOne)
  .delete(deleteOne);

module.exports = router;