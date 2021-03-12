const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VehicleDedicationSchema = new Schema({
  vehicle_type: {
    type: String
  },

  vehicle_owner: {
    type: String
  },

  vehicle_owner_occupation: {
    type: String
  },

  vehicle_owner_address: {
    type: String
  },

  vehicle_owner_email: {
    type: String
  },

  vehicle_owner_phone: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now()
  }



}, { timestamps : true});

module.exports = VehicleDedication = mongoose.model("vehicle_dedication", VehicleDedicationSchema);
