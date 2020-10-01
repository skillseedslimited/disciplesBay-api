const fs = require("fs");
const Permission = require("../models/Permission");

module.exports = {
  up: async function() {
    try {
      const permissions = JSON.parse(
        fs.readFileSync(`${__dirname}/_data/permissions.json`, "utf-8")
      );
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
          function(error, doc) {
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
