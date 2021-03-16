const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WeddingDedicationSchema = new Schema({

}, { timestamps : true});

module.exports = WeddingDedication = mongoose.model("wedding_dedication", WeddingDedicationSchema);
