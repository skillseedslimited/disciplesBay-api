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
  allListings: async (req, res) => {
    let userId = req.user._id;
     
    let babyChristianing = await BabyChristianing.find({author: userId}).sort({_id: -1}).populate("author");
    let businessDedication = await BusinessDedication.find({author: userId}).sort({_id: -1}).populate("author");
    let childDedication = await ChildDedication.find({author: userId}).sort({_id: -1}).populate("author");
    let houseDedication = await HouseDedication.find({author: userId}).sort({_id: -1}).populate("author");
    let maritalClasses = await MaritalClasses.find({author: userId}).sort({_id: -1}).populate("author");
    let marriageForm = await MarriageForm.find({author: userId}).sort({_id: -1}).populate("author");
    let relationshipReg = await RelationshipReg.find({author: userId}).sort({_id: -1}).populate("author");
    let vehicleDedication = await VehicleDedication.find({author: userId}).sort({_id: -1}).populate("author");
    let weddingDedication = await WeddingDedication.find({author: userId}).sort({_id: -1}).populate("author");

    res.status(200).json({
      success: true,
      message: "All user listings",
      data: {
        babyChristianing,
        businessDedication,
        childDedication,
        houseDedication,
        maritalClasses,
        marriageForm,
        relationshipReg,
        vehicleDedication,
        weddingDedication
      }
    })
  }
} 