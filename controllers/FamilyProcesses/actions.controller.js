const BabyChristianing = require("../../models/FamilyProcesses/BabyChristianing");
const BusinessDedication = require("../../models/FamilyProcesses/BusinessDedication");
const ChildDedication = require("../../models/FamilyProcesses/ChildDedication");
const HouseDedication = require ("../../models/FamilyProcesses/HouseDedication");
const MaritalClasses = require("../../models/FamilyProcesses/MaritalClasses");
const MarriageForm = require("../../models/FamilyProcesses/MarriageForm");
const RelationshipReg = require("../../models/FamilyProcesses/RelationshipReg");
const VehicleDedication = require("../../models/FamilyProcesses/VehicleDedication");
const WeddingDedication = require("../../models/FamilyProcesses/WeddingDedication");


module.exports = {
  approve: async function(req, res) {

    let {itemId} = req.params;
    let {familyProcess} = req.params;
    let singleProcess = {};

    if(familyProcess == 'baby-christianing') {
      singleProcess = await BabyChristianing.findById({_id: itemId});
    }

    if(familyProcess == 'child-dedication') {
      singleProcess = await ChildDedication.findById({_id: itemId});
    }

    if(familyProcess == 'business-dedication') {
      singleProcess = await BusinessDedication.findById({_id: itemId});
    }

    if(familyProcess == 'house-dedication') {
      singleProcess = await HouseDedication.findById({_id: itemId});
    }

    if(familyProcess == 'marital-class') {
      singleProcess = await MaritalClasses.findById({_id: itemId});
    }

    if(familyProcess == 'marriage-form') {
      singleProcess = await MarriageForm.findById({_id: itemId});
    }

    if(familyProcess == 'relationship-registration') {
      singleProcess = await RelationshipReg.findById({_id: itemId});
    }

    if(familyProcess == 'vehicle-dedication') {
      singleProcess = await VehicleDedication.findById({_id: itemId});
    }

    if(familyProcess == 'wedding-dedication') {
      singleProcess = await WeddingDedication.findById({_id: itemId});
    }

    singleProcess.processStatus = 'approved';
    await singleProcess.save()
      .then(approvedProcess => {
        res.status(201).json({
          success: true,
          message: "Familty process succesfully approved",
          data: approvedProcess 
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

  disApprove: async function(req, res) {
    let {itemId} = req.params;
    let {familyProcess} = req.params;

    let {reason} = req.body;
    let singleProcess = {};

    if(familyProcess == 'baby-christianing') {
      singleProcess = await BabyChristianing.findById({_id: itemId});
    }

    if(familyProcess == 'child-dedication') {
      singleProcess = await ChildDedication.findById({_id: itemId});
    }

    if(familyProcess == 'business-dedication') {
      singleProcess = await BusinessDedication.findById({_id: itemId});
    }

    if(familyProcess == 'house-dedication') {
      singleProcess = await HouseDedication.findById({_id: itemId});
    }

    if(familyProcess == 'marital-class') {
      singleProcess = await MaritalClasses.findById({_id: itemId});
    }

    if(familyProcess == 'marriage-form') {
      singleProcess = await MarriageForm.findById({_id: itemId});
    }

    if(familyProcess == 'relationship-registration') {
      singleProcess = await RelationshipReg.findById({_id: itemId});
    }

    if(familyProcess == 'vehicle-dedication') {
      singleProcess = await VehicleDedication.findById({_id: itemId});
    }

    if(familyProcess == 'wedding-dedication') {
      singleProcess = await WeddingDedication.findById({_id: itemId});
    }

    singleProcess.processStatus = 'disapproved';
    singleProcess.message = reason;
    await singleProcess.save()
      .then(disApprovedProcess => {
        res.status(201).json({
          success: true,
          message: "Familty process succesfully disapproved",
          data: disApprovedProcess 
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

  deleteItem: async function(req, res) {
    let {itemId} = req.params;
    let {familyProcess} = req.params;
    let singleProcess = {};

    if(familyProcess == 'baby-christianing') {
      singleProcess = await BabyChristianing.findByIdAndDelete({_id: itemId});
    }

    if(familyProcess == 'child-dedication') {
      singleProcess = await ChildDedication.findByIdAndDelete({_id: itemId});
    }

    if(familyProcess == 'business-dedication') {
      singleProcess = await BusinessDedication.findByIdAndDelete({_id: itemId});
    }

    if(familyProcess == 'house-dedication') {
      singleProcess = await HouseDedication.findByIdAndDelete({_id: itemId});
    }

    if(familyProcess == 'marital-class') {
      singleProcess = await MaritalClasses.findByIdAndDelete({_id: itemId});
    }

    if(familyProcess == 'marriage-form') {
      singleProcess = await MarriageForm.findByIdAndDelete({_id: itemId});
    }

    if(familyProcess == 'relationship-registration') {
      singleProcess = await RelationshipReg.findByIdAndDelete({_id: itemId});
    }

    if(familyProcess == 'vehicle-dedication') {
      singleProcess = await VehicleDedication.findByIdAndDelete({_id: itemId});
    }

    if(familyProcess == 'wedding-dedication') {
      singleProcess = await WeddingDedication.findByIdAndDelete({_id: itemId});
    }
  
    return res.status(201).json({
      success: true,
      message: "Familty process succesfully deleted",
      data: null 
    });

  }
}