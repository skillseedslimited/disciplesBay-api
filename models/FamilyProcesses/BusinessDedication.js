const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BusinessDedicationSchema = new Schema({
  business_name: {
    type: String,
    required: true
  },

  business_type: {
    type: String,
    required: true
  },

  business_address: {
    type: String,
    required: true
  },

  business_owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },

  business_owner_address: {
    type: String,
    required: true
  },

  business_owner_email: {
    type: String,
    required: true
  },

  business_owner_phone: {
    type: String,
    required: true
  },

  guarantor_name: {
    type: String,
    required: true
  }

}, { timestamps : true});

module.exports = BusinessDedication = mongoose.model("business_dedication", BusinessDedicationSchema);
