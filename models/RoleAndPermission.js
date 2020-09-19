const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RoleAndPermissionSchema = new Schema({
  permission: {
    type: Schema.Types.ObjectId,
    ref: "Permission",
    default: null,
  },
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    default: null,
  },
  permission_name: {
    type: String,
    default: "",
  },
});

module.exports = RoleAndPermission = mongoose.model(
  "role_permission",
  RoleAndPermissionSchema
);
