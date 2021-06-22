const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChildDedicationSchema = new Schema({

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }, 

  parents_name: {
    type: String,
    required: true
  },

  parents_contact_address: {
    type: String,
    required: true
  },

  parents_phone_number: {
    type: String,
    required: true
  },

  when_married: {
    type: Date,
    required: true
  },

  where_married: {
    type: String,
    required: true
  },

  how_long: {
    type: String,
    required: true
  },

  baby_gender: {
    type: String,
    required: true
  },

  baby_name: {
    type: String,
    required: true
  },

  baby_position: {
    type: String,
    required: true
  },

  baby_dob: {
    type: Date,
    required: true
  },  

  guarantor_name: {
    type: String,
    required: true
  },

  familyProcess: {
    type: String, 
    default: 'child-dedication'
  },

  message: {
    type: String
  },

  processStatus: {
    type: String, 
    default: 'pending'
  }

}, { timestamps : true});

module.exports = ChildDedication = mongoose.model("child_dedication", ChildDedicationSchema);
