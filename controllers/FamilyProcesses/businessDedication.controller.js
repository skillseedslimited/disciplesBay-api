const BusinessDedication = require("../../models/FamilyProcesses/BusinessDedication")

module.exports = {
  getAll: async (req, res) => {
    await BusinessDedication.find({})
      .sort({_id: -1})
      .then(businesDedications => {
        res.status(200).json({
          success: true,
          data: businesDedications
        })
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

  createNew: async (req, res) => {
    let {
      business_name,
      business_type,
      business_address,
      business_owner_address,
      business_owner_email,
      business_owner_phone,
      guarantor_name
    } = req.body;

    let newBusinessDedication = new BusinessDedication({
      business_name,
      business_type,
      business_address,
      business_owner_address,
      business_owner_email,
      business_owner_phone,
      guarantor_name
    });

    await newBusinessDedication.save()
      .then(newlyCreated => {
        res.status(201).json({
          success: true,
          message: "Business dedication created succesfully",
          data: newlyCreated 
        });
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
      business_name,
      business_type,
      business_address,
      business_owner_address,
      business_owner_email,
      business_owner_phone,
      guarantor_name
    } = req.body;

    await BusinessDedication.findByIdAndUpdate({_id: itemId}, {
      business_name,
      business_type,
      business_address,
      business_owner_address,
      business_owner_email,
      business_owner_phone,
      guarantor_name
    })
      .then(updateItem => {
        if (updateItem != null){

          res.status(201).json({
            success: true,
            message: "Updated Successfully",
            data: updateItem
          })

        }else{
          res.status(200).json({
            success: false,
            message: "No item found",
          })
        }
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

  deleteOne: async (req, res) => {
    let itemId = req.params.id;

    await BusinessDedication.findByIdAndDelete({_id: itemId})
      .then(deletedItem => {
        if (deletedItem != null) {
          res.status(200).json({
            success: true,
            message: "Deleted Successfully",
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
        if (err)
          res.json({
            success: false,
            message: "Something went wrong",
            data: null 
          })
      })
  },

  singleItem: async (req, res) => {
    let itemId = req.params.id;

    await BusinessDedication.findById({_id: itemId})
      .then(singleItem => {

        if (singleItem != null) {
          res.status(200).json({
            success: true,
            message: "Found Successfully",
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
        if (err)
          res.json({
            success: false,
            message: "Something went wrong",
            data: null 
          })
      })
  }
}