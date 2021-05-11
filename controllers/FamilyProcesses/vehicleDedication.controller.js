const VehicleDedication = require("../../models/FamilyProcesses/VehicleDedication");

module.exports = {
  getAll: async (req, res) => {
    await VehicleDedication.find({})
      .sort({_id: -1})
      .populate("author")
      .then(vehicleDedications => {
        res.status(200).json({
          success: true,
          data: vehicleDedications
        })
      })
      .catch(err => {
        console.log(err)
      })
  },

  createNew: async (req, res) => {
    let userId = req.user._id;

    let {
      vehicle_type,
      vehicle_owner,
      vehicle_owner_name,
      vehicle_owner_occupation,
      vehicle_owner_address,
      vehicle_owner_email,
      vehicle_owner_phone
    } = req.body;

    let newVehicleDedication = await new VehicleDedication({
      author: userId,
      vehicle_type,
      vehicle_owner,
      vehicle_owner_name,
      vehicle_owner_occupation,
      vehicle_owner_address,
      vehicle_owner_email,
      vehicle_owner_phone
    });

    await newVehicleDedication.save()
      .then(newlyCreated => {
        res.status(201).json({
          success: true,
          message: "Vehicle dedication created succesfully",
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
      vehicle_type,
      vehicle_owner,
      vehicle_owner_name,
      vehicle_owner_occupation,
      vehicle_owner_address,
      vehicle_owner_email,
      vehicle_owner_phone
    } = req.body;

    await VehicleDedication.findByIdAndUpdate({_id: itemId}, {
      vehicle_type,
      vehicle_owner,
      vehicle_owner_name,
      vehicle_owner_occupation,
      vehicle_owner_address,
      vehicle_owner_email,
      vehicle_owner_phone
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

    await VehicleDedication.findByIdAndDelete({_id: itemId})
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

    await VehicleDedication.findById({_id: itemId})
      .populate("author")
      .then(singleItem => {

        if (singleItem != null) {
          res.status(200).json({
            success: true,
            message: "Single vehicle dedication Found Successfully",
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