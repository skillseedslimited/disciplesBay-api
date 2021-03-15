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

  house_owner: {
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

  house_owner_phpone: {
    type: String,
    required: true
  },

  house_owner_sign: {
    type: String,
    required: true
  },

  guarantor_name: {
    type: String,
    required: true
  },

  date: {
    type: Date,
    default: Date.now()
  }

}, { timestamps : true});

module.exports = HouseDedication = mongoose.model("house_dedication", HouseDedicationSchema);
