const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MarriageFormSchema = new Schema({
  name: {
    type: String,
  },

  address: {
    type: String
  },

  physical_address: {
    type: String
  },

  email: {
    type: String
  },

  facebook: {
    type: String
  },

  twitter: {
    type: String
  },

  snapchat: {
    type: String
  },

  instagram: {
    type: String
  },

  phone_number: {
    type: String
  },

  dob: {
    type: String
  },

  occupation: {
    type: String
  },

  office_address: {
    type: String
  }, 

  spouse_name: {
    type: String
  },

  spouse_occupation: {
    type: String
  },

  spouse_dob: {
    type: String
  },

  spouse_firstcontact: {
    type: String
  },

  spouse_firstcontact_circumstance: {
    type: String
  },

  spouse_business: {
    type: String
  },

  spouse_work_address: {
    type: String
  },

  relationship_startdate: {
    type: String
  },

  relationship_report: {
    type: String
  },

  relationship_report_date: {
    type: String
  },

  wedding_date: {
    type: String
  },

  // Membership of church/partnership
  date_joined_coza: {
    type: String
  },

  date_spouse_joined_coza: {
    type: String
  },

  coza_partner: {
    type: String
  },

  coza_partner_start_date: {
    type: String
  },

  any_coza_involvement: {
    type: String
  },

  // Boran Again Experience
  date_boranagain: {
    type: String
  },

  where_bornagain: {
    type: String
  },

  speak_intongues: {
    type: String
  },

  spouse_bornagain_date: {
    type: String
  },

  spouse_speak_intongues: {
    type: String
  },

  refresher_training: {
    type: String
  },

  // Finance
  groome_monthly_income: {
    type: String
  },

  income_source: {
    type: String
  },

  bride_income: {
    type: String
  },

  groome_own_house: {
    type: String
  },

  rental_status: {
    type: String
  },

  propertyowner_relationship_status: {
    type: String
  },


  domicile_city: {
    type: String
  },
  
  // Marital History
  parties_married: {
    type: String
  },

  premarried_date: {
    type: String
  },

  premarried_nature: {
    type: String
  },

  present_marital_status: {
    type: String
  },

  //Either not a member References
  current_church: {
    type: String
  },

  church_address: {
    type: String
  },

  church_email: {
    type: String
  },
  
  church_web: {
    type: String
  },

  pastor_name: {
    type: String
  },

  pastor_email: {
    type: String
  },

  pastor_phone: {
    type: String
  },

  membership_length: {
    type: String
  },

  any_church_involvement: {
    type: String
  },

  // For the Coza Member
  referee_supervisor_name: {
    type: String
  },

  supervisor_comment: {
    type: String
  },

  // Attestation
  agree: {
    type: String
  },

  date: {
    type: Date,
    default: Date.now()
  }

}, { timestamps : true});

module.exports = MarriageForm = mongoose.model("marriage_form", MarriageFormSchema);
