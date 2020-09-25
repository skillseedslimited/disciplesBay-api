const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
const bcrypt = require("bcryptjs");

//load Models
const Role = require("./models/Role");
const User = require("./models/User");
const RoleAndPermission = require("./models/RoleAndPermission");
const Permission = require("./models/Permission");

//connect to db
mongoose.connect(process.env.mongoURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

//read JSON files
// const roles = JSON.parse(
//   fs.readFileSync(`${__dirname}/_data/roles.json`, "utf-8")
// );

const permissions = JSON.parse(
  fs.readFileSync(`${__dirname}/_data/permissions.json`, "utf-8")
);

//Import data
const importData = async () => {
  try {
    const role = await Role.findOneAndUpdate(
      {
        name: process.env.SUPER_ADMIN_ROLE_NAME,
      },
      { name: process.env.SUPER_ADMIN_ROLE_NAME },
      { upsert: true, setDefaultsOnInsert: true, new: true },
      function(error, doc) {
        if (!error) {
          console.log("role is created");
        } else {
          console.log(error);
        }
      }
    );

    const user_role = await Role.findOneAndUpdate(
      {
        name: process.env.USER_ROLE_NAME,
      },
      { name: process.env.USER_ROLE_NAME },
      { upsert: true, setDefaultsOnInsert: true, new: true },
      function(error, doc) {
        if (!error) {
          console.log("role is created");
        } else {
          console.log(error);
        }
      }
    );

    const password = bcrypt.hashSync(process.env.SUPER_ADMIN_PASSWORD, 10);
    let adminObject = {
      username: process.env.SUPER_USERNAME,
      email: process.env.SUPER_ADMIN,
      phoneNumber: "1234567890",
      password,
      role: role._id,
      active: true,
    };

    const super_admin = await User.findOneAndUpdate(
      {
        email: process.env.SUPER_ADMIN,
      },
      adminObject,
      { upsert: true, setDefaultsOnInsert: true, new: true },
      function(error, doc) {
        if (!error) {
          console.log("Super admin seeded");
        } else {
          console.log(error);
        }
      }
    );

    //go thru permissions and resync with super admin
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
      await RoleAndPermission.findOneAndUpdate(
        {
          permission: perm._id,
          role: role._id,
        },
        {
          permission: perm._id,
          role: role._id,
          permission_name: permission.name,
        },
        { upsert: true, setDefaultsOnInsert: true },
        function(error, doc) {
          if (!error) {
          } else {
            console.log(error);
          }
        }
      );
    }
    console.log("Data imported".green.inverse);

    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//Delete imported data
const deleteData = async () => {
  try {
    await Role.deleteMany();
    console.log("Data destroyed".red.inverse);
    process.exit();
  } catch (err) {
    console.log(err);
  }
};
//select which seeder process to run -i or -d
if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
