const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WeddingDedicationSchema = new Schema({
  author: {
    type: String
  }, 

  name: { 
    type: String 
  },

  contact_address: {
    type: String
  },

  phone_number: {
    type: String
  },

  how_long: {
    type: String
  },

  when_married: {
    type: String
  },

  where_married: {
    type: String
  },

  coza_how_long: {
    type: String
  },

  use_pictures: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now()
  }


}, { timestamps : true});

module.exports = WeddingDedication = mongoose.model("wedding_dedication", WeddingDedicationSchema);
