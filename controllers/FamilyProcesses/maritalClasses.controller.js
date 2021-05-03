const MaritalClasses = require("../../models/FamilyProcesses/MaritalClasses");

module.exports = {
  getAll: async (req, res) => {
    await MaritalClasses.find({})
      .sort({_id: -1})
      .populate("author")
      .then(maritalClasses => {
        res.status(200).json({
          success: true,
          data: maritalClasses
        })
      })
      .catch(err => {
        console.log(err)
      })
  },

  createNew: async (req, res) => {
    let userId = req.user._id;

    let {
      p1_name,
      p1_passport,
      p1_contact_address,
      p1_email,
      p1_phone,
      p1_howlong,
      p1_spouse,
      p1_when_born_again,
      p1_courtship_length,
      p1_when_wed, 
      p1_where_wed,
      p1_use_picture,
      p1_guarantor_name,
      p2_name,
      p2_passport,
      p2_contact_address,
      p2_email,
      p2_phone,
      p2_howlong,
      p2_spouse,
      p2_when_born_again,
      p2_courtship_length,
      p2_when_wed,
      p2_where_wed,
      p2_use_picture,
      p2_guarantor_name
    } = req.body;
    // console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[", req.body)

    let newMaritalClass = await new MaritalClasses({
      author: userId,
      p1_name,
      p1_passport,
      p1_contact_address,
      p1_email,
      p1_phone,
      p1_howlong,
      p1_spouse,
      p1_when_born_again,
      p1_courtship_length,
      p1_when_wed, 
      p1_where_wed,
      p1_use_picture,
      p1_guarantor_name,
      p2_name,
      p2_passport,
      p2_contact_address,
      p2_email,
      p2_phone,
      p2_howlong,
      p2_spouse,
      p2_when_born_again,
      p2_courtship_length,
      p2_when_wed,
      p2_where_wed,
      p2_use_picture,
      p2_guarantor_name
    });

    newMaritalClass.save()
      .then(newlyCreated => {
        res.status(201).json({
          success: true,
          message: "Marital class created successfully",
          data: newlyCreated });
      })
      .catch(err => {
        if (err)
          res.json({
            success: false,
            message: "Something went wrong",
            data: err 
          })
      })
  },

  editOne: async (req, res) => {
    let itemId = req.params.id;
    let {
      p1_name,
      p1_passport,
      p1_contact_address,
      p1_email,
      p1_phone,
      p1_howlong,
      p1_spouse,
      p1_when_born_again,
      p1_courtship_length,
      p1_when_wed, 
      p1_where_wed,
      p1_use_picture,
      p1_guarantor_name,
      p2_name,
      p2_passport,
      p2_contact_address,
      p2_email,
      p2_phone,
      p2_howlong,
      p2_spouse,
      p2_when_born_again,
      p2_courtship_length,
      p2_when_wed,
      p2_where_wed,
      p2_use_picture,
      p2_guarantor_name
    } = req.body;

    await MaritalClasses.findByIdAndUpdate({_id: itemId}, {
      p1_name,
      p1_passport,
      p1_contact_address,
      p1_email,
      p1_phone,
      p1_howlong,
      p1_spouse,
      p1_when_born_again,
      p1_courtship_length,
      p1_when_wed, 
      p1_where_wed,
      p1_use_picture,
      p1_guarantor_name,
      p2_name,
      p2_passport,
      p2_contact_address,
      p2_email,
      p2_phone,
      p2_howlong,
      p2_spouse,
      p2_when_born_again,
      p2_courtship_length,
      p2_when_wed,
      p2_where_wed,
      p2_use_picture,
      p2_guarantor_name
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

    await MaritalClasses.findByIdAndDelete({_id: itemId})
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

    await MaritalClasses.findById({_id: itemId})
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