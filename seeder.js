const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
const bcrypt = require("bcryptjs");
const { exit } = require("process");
//connect to db
mongoose.connect(process.env.mongoURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const runAllSeeder = async function() {
  try {
    // var seeders = fs.readdirSync("./seeders/");
    var seeders = [
      "PermissionSeeder",
      "RoleSeeder",
      "AdminSeeder",
      "PaypalSeeder",
      "FlutterWaveSeeder",
    ];
    for (myseeder of seeders) {
      var seeder = require("./seeders/" + myseeder);
      await seeder.up();
      console.log(myseeder + " seeded ".green);
    }
    exit();
  } catch (error) {
    console.log(error);
  }
};

const runSingleSeeder = async () => {
  if (process.argv[3] != undefined) {
    try {
      var seeder_name = process.argv[3];
      var seeder = require("./seeders/" + seeder_name);
      await seeder.up();
      console.log(seeder_name + " seeded ".green);
      process.exit();
    } catch (error) {
      console.log(error + " ".red);
    }
  } else {
    console.log(process.argv[3]);
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
if (process.argv[2] === "-all") {
  runAllSeeder();
} else if (process.argv[2] === "-d") {
  deleteData();
} else if (process.argv[2] === "-s") {
  runSingleSeeder();
}
