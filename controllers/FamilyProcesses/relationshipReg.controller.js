const RelationshipReg = require("../../models/FamilyProcesses/RelationshipReg");

module.exports = {
  getAll: async (req, res) => {
    await RelationshipReg.find({})
    .sort({_id: -1})
    .populate("author")
      .then(relationshiptRegs => {
        res.status(200).json({
          success: true,
          data: relationshiptRegs
        })
      })
      .catch(err => {
        console.log(err)
      })
  },

  createNew: async (req, res) => {
    let userId = req.user._id;

    let {
      p1_passport,
      p1_contact_address,
      p1_email,
      p1_phone,
      p1_name,
      p1_howlong,
      p1_spouse,
      p1_when_born_again,
      p1_relationship_length,
      p1_relationship_stage,
      p1_when_wed,
      p1_where_wed,
      p1_use_picture,
      p1_guarantor_name,
      p2_passport,
      p2_contact_address,
      p2_email,
      p2_phone,
      p2_name,
      p2_howlong,
      p2_spouse,
      p2_when_born_again,
      p2_relationship_length,
      p2_relationship_stage,
      p2_when_wed,
      p2_where_wed,
      p2_use_picture,
      p2_guarantor_name
    } = req.body;

    let newRelationshipReg = await new RelationshipReg({
      author: userId,
      p1_passport,
      p1_contact_address,
      p1_email,
      p1_phone,
      p1_name,
      p1_howlong,
      p1_spouse,
      p1_when_born_again,
      p1_relationship_length,
      p1_relationship_stage,
      p1_when_wed,
      p1_where_wed,
      p1_use_picture,
      p1_guarantor_name,
      p2_passport,
      p2_contact_address,
      p2_email,
      p2_phone,
      p2_name,
      p2_howlong,
      p2_spouse,
      p2_when_born_again,
      p2_relationship_length,
      p2_relationship_stage,
      p2_when_wed,
      p2_where_wed,
      p2_use_picture,
      p2_guarantor_name
    });

    await newRelationshipReg.save()
      .then(newlyCreated => {
        res.status(201).json({
          success: true,
          message: "Relationship registered succesfully",
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
      p1_passport,
      p1_contact_address,
      p1_email,
      p1_phone,
      p1_name,
      p1_howlong,
      p1_spouse,
      p1_when_born_again,
      p1_relationship_length,
      p1_relationship_stage,
      p1_when_wed,
      p1_where_wed,
      p1_use_picture,
      p1_guarantor_name,
      p2_passport,
      p2_contact_address,
      p2_email,
      p2_phone,
      p2_name,
      p2_howlong,
      p2_spouse,
      p2_when_born_again,
      p2_relationship_length,
      p2_relationship_stage,
      p2_when_wed,
      p2_where_wed,
      p2_use_picture,
      p2_guarantor_name
    } = req.body;

    await RelationshipReg.findByIdAndUpdate({_id: itemId}, {
      p1_passport,
      p1_contact_address,
      p1_email,
      p1_phone,
      p1_name,
      p1_howlong,
      p1_spouse,
      p1_when_born_again,
      p1_relationship_length,
      p1_relationship_stage,
      p1_when_wed,
      p1_where_wed,
      p1_use_picture,
      p1_guarantor_name,
      p2_passport,
      p2_contact_address,
      p2_email,
      p2_phone,
      p2_name,
      p2_howlong,
      p2_spouse,
      p2_when_born_again,
      p2_relationship_length,
      p2_relationship_stage,
      p2_when_wed,
      p2_where_wed,
      p2_use_picture,
      p2_guarantor_name
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

    await RelationshipReg.findByIdAndDelete({_id: itemId})
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

    await RelationshipReg.findById({_id: itemId})
      .populate("author")
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