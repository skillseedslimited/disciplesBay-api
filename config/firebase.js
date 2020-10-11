const fbaseadmin = require("firebase-admin");
var serviceAccount = require("./slav.json");
require("dotenv").config();

fbaseadmin.initializeApp({
  credential: fbaseadmin.credential.cert(serviceAccount),
  databaseURL: process.env.FBASE_DB,
});

module.exports = fbaseadmin;
