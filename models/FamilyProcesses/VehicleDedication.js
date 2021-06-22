const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VehicleDedicationSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  
  vehicle_owner: {
    type: String
  },

  vehicle_type: {
    type: String
  },

  vehicle_owner_name: {
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

  familyProcess: {
    type: String, 
    default: 'vehicle-dedication'
  },

  message: {
    type: String
  },

  processStatus: {
    type: String, 
    default: 'pending'
  }

}, { timestamps : true});

module.exports = VehicleDedication = mongoose.model("vehicle_dedication", VehicleDedicationSchema);
