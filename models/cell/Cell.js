const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CellSchema = new Schema({
  cell_name: {
    type: String
  },

  cell_location: {
    type: String
  },

  cell_leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  
  cell_members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  }],

}, { timestamps : true});
 
 module.exports = Cell = mongoose.model("cell", CellSchema);
 