const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
const bcrypt = require("bcryptjs");
const Role = require("../models/Role");
const User = require("../models/User");
const RoleAndPermission = require("../models/RoleAndPermission");
const Permission = require("../models/Permission");
const { findOneAndUpdate } = require("../models/User");
const path = require("path");
const roles = require("../_data/roles.json");
module.exports = {
  up: async function () {
    try {
      //   var file_path = path.join(__dirname, "..", "_data", "roles.json");
      //   const roles = fs.readFileSync(file_path, "utf-8");
      //go thru permissions and resync with super admin
      for (role of roles) {
        var role = await Role.findOneAndUpdate(
          { name: role.name },
          {
            name: role.name,
          },
          { upsert: true, setDefaultsOnInsert: true }
        ).exec();
      }

      var super_admin_role = await Role.findOne({ name: "super_admin" }).exec();
      if (super_admin_role) {
        let permissions = await Permission.find({}).exec();
        // console.log(permissions);
        for (permission of permissions) {
          await RoleAndPermission.findOneAndUpdate(
            {
              permission: permission._id,
              role: super_admin_role._id,
            },
            {
              permission: permission._id,
              role: super_admin_role._id,
              permission_name: permission.name,
            },
            { upsert: true, setDefaultsOnInsert: true },
            function (error, doc) {
              if (!error) {
              } else {
                console.log(error);
              }
            }
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
};
