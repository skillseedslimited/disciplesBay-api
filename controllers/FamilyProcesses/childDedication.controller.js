const ChildDedication = require("../../models/FamilyProcesses/ChildDedication");

module.exports = {
  getAll: async (req, res) => {
    await ChildDedication.find({})
      .sort({_id: -1})
      .populate("author")
      .then(childDedications => {
        res.status(200).json({
          success: true,
          data: childDedications
        })
      })
      .catch(err => {

      })
  },

  createNew: async (req, res) => {
    let userId = req.user._id;

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
      author: userId,
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

    await newChildDedication.save()
      .then(newlyCreated => {
        res.status(201).json({
          success: true,
          message: "Child dedication created succesfully",
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

    await ChildDedication.findByIdAndUpdate({_id: itemId}, {
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
        if (updateItem != null) {
          res.status(201).json({
            success: true,
            message: "Updated successfully",
            data: updateItem
          })
        }else{
          res.status(200).json({
            success: false,
            message: "No item found"
          })
        }
      })
      .catch(err => {
        console.log(err)
      })
  },

  deleteOne: async (req, res) => {
    let itemId = req.params.id;

    await ChildDedication.findByIdAndDelete({_id: itemId})
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

  singleItem: async (req, res) => {
    let itemId = req.params.id;

    await ChildDedication.findById({_id: itemId})
    .populate("author")
      .then(singleItem => {
        if (singleItem != null) {
          res.status(201).json({
            success: true,
            data: singleItem
          });
        }else{
          res.status(200).json({
            success: false,
            message: "No item found"
          });
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
}