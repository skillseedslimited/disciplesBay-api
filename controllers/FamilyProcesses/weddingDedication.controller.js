const WeddingDedication = require("../../models/FamilyProcesses/WeddingDedication");

module.exports = {
  getAll: async (req, res) => {
    await WeddingDedication.find({})
      .sort({_id: -1})
      .then(weddingDedications => {
        res.status(200).json({
          success: true,
          data: weddingDedications
        })
      })
      .catch(err => {
        console.log(err)
      })
  },

  createNew: async (req, res) => {
    let {
      author,
      name,
      contact_address,
      phone_number,
      how_long,
      when_married,
      where_married,
      coza_how_long,
      use_pictures
    } = req.body;

    let newWeddingDedication = await new WeddingDedication({
      author,
      name,
      contact_address,
      phone_number,
      how_long,
      when_married,
      where_married,
      coza_how_long,
      use_pictures
    });

    await newWeddingDedication.save()
      .then(newlyCreated => {
        res.status(201).json({
          success: true,
          message: "Wedding dedication created succesfully",
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
      author,
      name,
      contact_address,
      phone_number,
      how_long,
      when_married,
      where_married,
      coza_how_long,
      use_pictures
    } = req.body;

    await WeddingDedication.findByIdAndUpdate({_id: itemId}, {
      author,
      name,
      contact_address,
      phone_number,
      how_long,
      when_married,
      where_married,
      coza_how_long,
      use_pictures
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
    }).catch(err => {
      console.log(err)
    })
  },

  deleteOne: async (req, res) => {
    let itemId = req.params.id;

    await WeddingDedication.findByIdAndDelete({_id: itemId})
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

    await WeddingDedication.findById({_id: itemId})
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