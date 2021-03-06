const HouseDedication = require ("../../models/FamilyProcesses/HouseDedication");

module.exports = {
  getAll: async function(req, res) {
    await HouseDedication.find({})
      .sort({_id: -1})
      .populate("author")
      .then(HouseDedications => {
        res.status(201).json({
          success: true,
          data: HouseDedications
        })
      })
      .catch(err => {
        console.log(err)
      })
  },

  createNew: async function(req, res) {
    let userId = req.user._id;
    let {
      house_type,
      house_address,
      house_owner_name,
      house_owner_occupation,
      house_owner_contact_address,
      house_owner_email,
      house_owner_phone,
      guarantor_name
    } = req.body;

    let newHouseDedication = await new HouseDedication ({
      author: userId,
      house_type,
      house_address,
      house_owner_name,
      house_owner_occupation,
      house_owner_contact_address,
      house_owner_email,
      house_owner_phone,
      guarantor_name
    });

    await newHouseDedication.save()
      .then(newlyCreated => {
        res.status(201).json({
          success: true,
          message: "House dedication created succesfully",
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

  editOne: async function(req, res) {
    let itemId = req.params.id;

    let {
      house_type,
      house_address,
      house_owner_name,
      house_owner_occupation,
      house_owner_contact_address,
      house_owner_email,
      house_owner_phone,
      guarantor_name
    } = req.body;

    await HouseDedication.findByIdAndUpdate({_id: itemId}, {
      house_type,
      house_address,
      house_owner_name,
      house_owner_occupation,
      house_owner_contact_address,
      house_owner_email,
      house_owner_phone,
      guarantor_name
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
      })
      .catch(err => {
        console.log(err)
      })
  },

  deleteOne: async function(req, res) {
    let itemId = req.params.id;
    
    await HouseDedication.findByIdAndDelete(itemId)
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

  singleItem: async function(req, res) {
    let itemId = req.params.id;

    await HouseDedication.findById({_id: itemId})
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