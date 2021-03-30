const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AppointmentSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },

  title: String,

  description: String,

  appointment_status: {
    type: String,
    default: 'Pending'
  },

  appointment_date: Date,

  rescheduled: {
    type: Boolean,
    default: false
  },

  completed: {
    type: Boolean,
    default: false
  },

  message: String


}, { timestamps : true});

module.exports = Appointments = mongoose.model("appointment", AppointmentSchema);
