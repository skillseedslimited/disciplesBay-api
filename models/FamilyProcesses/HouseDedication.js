const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HouseDedicationSchema = new Schema({
  house_type: {
    type: String,
    required: true
  },

  house_address: {
    type: String,
    required: true
  },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },

  house_owner_name: {
    type: String,
    required: true
  },

  house_owner_occupation: {
    type: String,
    required: true
  },

  house_owner_contact_address: {
    type: String,
    required: true
  },

  house_owner_email: {
    type: String,
    required: true
  },

  house_owner_phone: {
    type: String,
    required: true
  },

  guarantor_name: {
    type: String,
    required: true
  },

  familyProcess: {
    type: String, 
    default: 'house-dedication'
  },

  message: {
    type: String
  },

  processStatus: {
    type: String, 
    default: 'pending'
  }

}, { timestamps : true});

module.exports = HouseDedication = mongoose.model("house_dedication", HouseDedicationSchema);
