const ChildDedication = require("../../models/FamilyProcesses/ChildDedication");

module.exports = {
  getAll: async function(req, res) {
    await ChildDedication.find({})
      .then(childDedications => {
        res.status(200).json({
          success: true,
          data: childDedications
        })
      })
      .catch(err => {

      })
  },

  createNew: async function(req, res) {

    let {
      parents_name, 
      parents_contact_address, 
      parents_phone_number, 
      when_married, 
      where_married, 
      how_long, 
      baby_gender, 
      baby_name, 
      baby_position, 
      baby_dob, 
      guarantor_name} = req.body;

    let newChildDedication = await new ChildDedication({
      parents_name, 
      parents_contact_address,
      parents_phone_number,
      when_married,
      where_married,
      how_long,
      baby_name,
      baby_gender,
      baby_dob,
      baby_position,
      guarantor_name
    });

    // console.log(newChildDedication)

    newChildDedication.save()
      .then(newlyCreated => {
        res.status(200).json({
          success: true,
          message: "Baby Christianing created succesfully",
          data: newlyCreated });
      })
      .catch(err => {
        if (err)
          res.json(err)
      })


  },

  editOne: async function(req, res) {
    let {
      parents_name, 
      parents_contact_address, 
      parents_phone_number, 
      when_married, 
      where_married, 
      how_long, 
      baby_gender, 
      baby_name, 
      baby_position, 
      baby_dob, 
      guarantor_name} = req.body;
    console.log(req.body) 

    ChildDedication.findByIdAndUpdate(req.params.id, {
      parents_name, 
      parents_contact_address, 
      parents_phone_number, 
      when_married, 
      where_married, 
      how_long, 
      baby_gender, 
      baby_name, 
      baby_position, 
      baby_dob, 
      guarantor_name})
      .then(updateItem => {
        if (updateItem != null)
          res.status(200).json({
            success: true,
            message: "Updated successfully",
            data: updateItem
          })

        res.status(200).json({
          success: false,
          message: "No item found"
        })
      })
      .catch(err => {
        console.log(err)
      })
  },

  deleteOne: async function(req, res) {
    ChildDedication.findByIdAndDelete(req.params.id)
      .then(deletedItem => {
        if (deletedItem != null)
          res.status(200).json({
            success: true,
            message: "Deleted successfully",
            data: deletedItem
          })
        
        res.status(200).json({
          success: false,
          message: "No item found"
        })
      })
      .catch(err => {
        console.log(err)
      })
  },

  singleItem: async function(req, res) {
    let itemId = req.params.id;

    await ChildDedication.findById({_id: itemId})
      .then(singleItem => {
        if (singleItem != null)
          res.status(200).json({
            success: true,
            data: singleItem
          });

        res.status(200).json({
          success: false,
          message: "No item found"
        });
      })
      .catch(err => {
        console.log(err);
      })
  }
}