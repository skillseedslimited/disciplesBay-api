const MarriageForm = require("../../models/FamilyProcesses/MarriageForm");

module.exports = {
  getAll: async (req, res) => {
    await MarriageForm.find({})
    .sort({_id: -1})
    .populate("author")
      .then(marriageForms => {
        res.status(200).json({
          success: true,
          data: marriageForms
        })
      })
      .catch(err => {
        console.log(err)
      })
  },

  createNew: async (req, res) => {
    let userId = req.user._id;

    let {
      name,
      address,
      physical_address,
      email,
      facebook,
      twitter,
      snapchat,
      instagram,
      phone_number,
      dob,
      occupation,
      office_address,
      spouse_name,
      spouse_occupation,
      spouse_dob,
      spouse_firstcontact,
      spouse_firstcontact_circumstance,
      spouse_business,
      spouse_work_address,
      relationship_startdate,
      relationship_report,
      relationship_report_date,
      wedding_date,
      date_joined_coza,
      date_spouse_joined_coza,
      coza_partner,
      coza_partner_start_date,
      any_coza_involvement,
      date_boranagain,
      where_bornagain,
      speak_intongues,
      spouse_bornagain_date,
      spouse_speak_intongues,
      refresher_training,
      groome_monthly_income,
      income_source,
      bride_income,
      groome_own_house,
      rental_status,
      propertyowner_relationship_status,
      domicile_city,
      parties_married,
      premarried_date,
      premarried_nature,
      present_marital_status,
      current_church,
      church_address,
      church_email,
      church_web,
      pastor_name,
      pastor_email,
      pastor_phone,
      membership_length,
      any_church_involvement,
      referee_supervisor_name,
      supervisor_comment,
      agree
    } = req.body;

    let newMarriageForm = await new MarriageForm({
      author: userId,
      name,
      address,
      physical_address,
      email,
      facebook,
      twitter,
      snapchat,
      instagram,
      phone_number,
      dob,
      occupation,
      office_address,
      spouse_name,
      spouse_occupation,
      spouse_dob,
      spouse_firstcontact,
      spouse_firstcontact_circumstance,
      spouse_business,
      spouse_work_address,
      relationship_startdate,
      relationship_report,
      relationship_report_date,
      wedding_date,
      date_joined_coza,
      date_spouse_joined_coza,
      coza_partner,
      coza_partner_start_date,
      any_coza_involvement,
      date_boranagain,
      where_bornagain,
      speak_intongues,
      spouse_bornagain_date,
      spouse_speak_intongues,
      refresher_training,
      groome_monthly_income,
      income_source,
      bride_income,
      groome_own_house,
      rental_status,
      propertyowner_relationship_status,
      domicile_city,
      parties_married,
      premarried_date,
      premarried_nature,
      present_marital_status,
      current_church,
      church_address,
      church_email,
      church_web,
      pastor_name,
      pastor_email,
      pastor_phone,
      membership_length,
      any_church_involvement,
      referee_supervisor_name,
      supervisor_comment,
      agree
    });

    await newMarriageForm.save()
      .then(newlyCreated => {
        res.status(201).json({
          success: true,
          message: "Marriage form created succesfully",
          data: newlyCreated });
      })
      .catch(err => {
        if (err)
          res.json({
            success: false,
            message: "Something went wrong",
            data: null 
          })
      })
  },

  editOne: async (req, res) => {
    let itemId = req.params.id;
    let {
      name,
      address,
      physical_address,
      email,
      facebook,
      twitter,
      snapchat,
      instagram,
      phone_number,
      dob,
      occupation,
      office_address,
      spouse_name,
      spouse_occupation,
      spouse_dob,
      spouse_firstcontact,
      spouse_firstcontact_circumstance,
      spouse_business,
      spouse_work_address,
      relationship_startdate,
      relationship_report,
      relationship_report_date,
      wedding_date,
      date_joined_coza,
      date_spouse_joined_coza,
      coza_partner,
      coza_partner_start_date,
      any_coza_involvement,
      date_boranagain,
      where_bornagain,
      speak_intongues,
      spouse_bornagain_date,
      spouse_speak_intongues,
      refresher_training,
      groome_monthly_income,
      income_source,
      bride_income,
      groome_own_house,
      rental_status,
      propertyowner_relationship_status,
      domicile_city,
      parties_married,
      premarried_date,
      premarried_nature,
      present_marital_status,
      current_church,
      church_address,
      church_email,
      church_web,
      pastor_name,
      pastor_email,
      pastor_phone,
      membership_length,
      any_church_involvement,
      referee_supervisor_name,
      supervisor_comment,
      agree
    } = req.body;

    await MarriageForm.findByIdAndUpdate({_id: itemId}, {
      name,
      address,
      physical_address,
      email,
      facebook,
      twitter,
      snapchat,
      instagram,
      phone_number,
      dob,
      occupation,
      office_address,
      spouse_name,
      spouse_occupation,
      spouse_dob,
      spouse_firstcontact,
      spouse_firstcontact_circumstance,
      spouse_business,
      spouse_work_address,
      relationship_startdate,
      relationship_report,
      relationship_report_date,
      wedding_date,
      date_joined_coza,
      date_spouse_joined_coza,
      coza_partner,
      coza_partner_start_date,
      any_coza_involvement,
      date_boranagain,
      where_bornagain,
      speak_intongues,
      spouse_bornagain_date,
      spouse_speak_intongues,
      refresher_training,
      groome_monthly_income,
      income_source,
      bride_income,
      groome_own_house,
      rental_status,
      propertyowner_relationship_status,
      domicile_city,
      parties_married,
      premarried_date,
      premarried_nature,
      present_marital_status,
      current_church,
      church_address,
      church_email,
      church_web,
      pastor_name,
      pastor_email,
      pastor_phone,
      membership_length,
      any_church_involvement,
      referee_supervisor_name,
      supervisor_comment,
      agree
    })
    .then(updateItem => {
      if (updateItem != null){

        res.status(201).json({
          success: true,
          message: "Updated successfully",
          data: updateItem
        })

      }else{
        res.status(200).json({
          success: false,
          message: "No item found",
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },

  deleteOne: async (req, res) => {
    let itemId = req.params.id;

    await MarriageForm.findByIdAndDelete({_id: itemId})
      .then(deletedItem => {
        if (deletedItem != null) {
          res.status(200).json({
            success: true,
            message: "Deleted successfully",
            data: deletedItem
          })
        }else{
          res.status(200).json({
            success: false,
            message: "No item found",
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  },

  singleItem: async (req, res) => {
    let itemId = req.params.id;

    await MarriageForm.findById({_id: itemId})
      .populate("author")
      .then(singleItem => {

        if (singleItem != null) {
          res.status(200).json({
            success: true,
            message: "Found successfully",
            data: singleItem
          })
        }else{
          res.status(200).json({
            success: false,
            message: "No item found",
          })
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
}