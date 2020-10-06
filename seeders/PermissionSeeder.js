const fs = require("fs");
const Permission = require("../models/Permission");
const permissions = require("../_data/permissions.json");
module.exports = {
  up: async function () {
    try {
      for (permission of permissions) {
        var perm = await Permission.findOneAndUpdate(
          {
            name: permission.name,
          },
          {
            name: permission.name,
            description: permission.description,
            category: permission.category,
          },
          { upsert: true, setDefaultsOnInsert: true, new: true },
          function (error, doc) {
            if (!error) {
            } else {
              console.log(error);
            }
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  },
};
