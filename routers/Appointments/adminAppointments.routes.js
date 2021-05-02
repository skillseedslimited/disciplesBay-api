const express = require("express");
const router = express.Router();
const { authorizeUpdated} = require("../../middleware/authJwt");
const {
  getAll, 
  approveAppointment, 
  approvedAppointments, 
  disapproveAppointment, 
  disapprovedAppointments,
  pendingAppointments,
  completeAppointment,
  completedAppointments,
  rescheduleAppointment,
  rescheduledAppointments
} = require("../../controllers/Appointments/adminAppointment.controller")

// @route Get AllAppoinments
// @route Get GetAllApppointments
// @desc Fetch all appointments in the database
// @access Public
router.route("/")
  .get(getAll)

// ================ Approval ===================
router.route("/approve/:id")
  .post(approveAppointment);

router.route("/approved-appointments")
  .get(approvedAppointments);


// ================ Disapproval ===================
router.route("/disapprove/:id")
  .post(disapproveAppointment);

router.route("/disapproved-appointments")
  .get(disapprovedAppointments);


// ================= Pending ==================
router.route("/pending-appointments")
  .get(pendingAppointments);


// ================= Comeplete ====================
router.route("/complete/:id")
  .get(completeAppointment);

router.route("/completed-appointments")
  .get(completedAppointments);
 

// ================= Schedule =====================
router.route("/reschedule/:id")
  .put(rescheduleAppointment);

router.route("/rescheduled-appointments")
  .get(rescheduledAppointments);


module.exports = router;