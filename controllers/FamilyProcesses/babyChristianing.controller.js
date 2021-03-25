const BabyChristianing = require("../../models/FamilyProcesses/BabyChristianing")

module.exports = {
  getAll: async (req, res) => {
    await BabyChristianing.find({})
      .sort({_id: -1})
      .then(babyChristianings => {
        res.status(200).json({
          success: true,
          data: babyChristianings
        })
      })
      .catch(err => {
        console.log(err)
      })
  },

  createNew: async (req, res) => {

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

    let newBabyChristianing = new BabyChristianing({
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

    await newBabyChristianing.save()
      .then(newlyCreated => {
        res.status(201).json({
          success: true,
          message: "Baby christianing created succesfully",
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

    await BabyChristianing.findByIdAndUpdate({_id: itemId}, {
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
      })
      .catch(err => {
        console.log(err)
      })
  },

  deleteOne: async (req, res) => {
    let itemId = req.params.id;

    await BabyChristianing.findByIdAndDelete({_id: itemId})
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
        console.log(err)
      })
  },

  singleItem: async (req, res) => {
    let itemId = req.params.id;

    await BabyChristianing.findById({_id: itemId})
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
        console.log(err);
      })
  }
}