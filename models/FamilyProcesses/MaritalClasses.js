const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MaritalClassesSchema = new Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  
  p1_passport: {
    type: String
  },

  p1_contact_address: {
    type: String
  },

  p1_email: {
    type: String
  },

  p1_phone: {
    type: String
  },

  p1_name: {
    type: String,
    required: true
  },

  p1_howlong: {
    type: String,
    required: true
  },

  p1_spouse: {
    type: String
  },

  p1_when_born_again: {
    type: String,
    required: true
  },

  p1_courtship_length: {
    type: String,
    required: true
  },

  p1_when_wed: {
    type: String,
    required: true
  }, 

  p1_where_wed: {
    type: String,
    required: true
  },

  p1_use_picture: {
    type: String,
    required: true
  },

  p1_guarantor_name: {
    type: String,
    required: true
  },

  // Partner Two

  p2_passport: {
    type: String
  },

  p2_contact_address: {
    type: String
  },

  p2_email: {
    type: String
  },

  p2_phone: {
    type: String
  },

  p2_name: {
    type: String,
    required: true
  },

  p2_howlong: {
    type: String,
    required: true
  },

  p2_spouse: {
    type: String
  },

  p2_when_born_again: {
    type: String,
    required: true
  },

  p2_courtship_length: {
    type: String,
    required: true
  },

  p2_when_wed: {
    type: String,
    required: true
  },

  p2_where_wed: {
    type: String,
    required: true
  },

  p2_use_picture: {
    type: String,
    required: true
  },

  p2_guarantor_name: {
    type: String,
    required: true
  },

  familyProcess: {
    type: String, 
    default: 'marital-class'
  },

  message: {
    type: String
  },

  processStatus: {
    type: String, 
    default: 'pending'
  }

}, { timestamps : true});

module.exports = MaritalClasses = mongoose.model("marital_classes", MaritalClassesSchema);
