const BabyChristianing = require("../../models/FamilyProcesses/BabyChristianing")

module.exports = {
  getAll: async function(req, res) {
    await BabyChristianing.find({})
      .then(babyChristianings => {
        res.status(200).json({
          success: true,
          data: babyChristianings
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

    let newBabyChristianing = await new BabyChristianing({
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

    // console.log(newBabyChristianing)

    newBabyChristianing.save()
      .then(newlyCreated => {
        res.status(200).json({
          success: true,
          message: "Baby Christianing Created succesfully",
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
    // console.log(req.body) 

    BabyChristianing.findByIdAndUpdate(req.params.id, {
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
            message: "Updated Successfully",
            data: updateItem
          })

        res.status(200).json({
          success: false,
          message: "No item found",
        })
      })
      .catch(err => {
        console.log(err)
      })
  },

  deleteOne: async function(req, res) {
    BabyChristianing.findByIdAndDelete(req.params.id)
      .then(deletedItem => {
        if (deletedItem != null)
          res.status(200).json({
            success: true,
            message: "Deleted Successfully",
            data: deletedItem
          })
        res.status(200).json({
          success: false,
          message: "No item found",
        })
      })
      .catch(err => {
        console.log(err)
      })
  },

  singleItem: async function(req, res) {
    let itemId = req.params.id;

    await BabyChristianing.findById({_id: itemId})
      .then(singleItem => {
        res.status(200).json({
          success: true,
          data: singleItem
        });
      })
      .catch(err => {
        console.log(err);
      })
  }
}