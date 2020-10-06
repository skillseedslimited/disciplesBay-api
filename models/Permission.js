const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");
const PermissionSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: moment().format(),
  },
});

module.exports = Permission = mongoose.model("permission", PermissionSchema);
