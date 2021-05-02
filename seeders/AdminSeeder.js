const Permission = require("../models/Permission");
const RoleAndPermission = require("../models/RoleAndPermission");
const Role = require("../models/Role");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async function() {
    try {
      var super_admin_role = await Role.findOne({ name: "super_admin" }).exec();
      if (!super_admin_role) {
        throw Error("Role not found");
      }
      const password = bcrypt.hashSync(process.env.SUPER_ADMIN_PASSWORD, 10);
      let adminObject = {
        username: process.env.SUPER_USERNAME,
        email: process.env.SUPER_ADMIN,
        phoneNumber: "1234567890",
        password,
        role: super_admin_role._id,
        active: true,
      };
      const super_admin = await User.findOneAndUpdate(
        {
          email: process.env.SUPER_ADMIN,
        },

        adminObject,
        { upsert: true, setDefaultsOnInsert: true, new: true },
        function(error, doc) {
          if (error) {
            console.log(error);
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  },
};
