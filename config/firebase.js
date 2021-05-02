const fbaseadmin = require("firebase-admin");
const { defaultsDeep } = require("lodash");
var serviceAccount = require("./slav.json");
require("dotenv").config();

fbaseadmin.initializeApp({
  credential: fbaseadmin.credential.cert(serviceAccount),
  databaseURL: process.env.FBASE_DB,
});

module.exports = fbaseadmin;

// new wedding ded
// {
//   "author": "",
//   "name": "",
//   "contact_address": "",
//   "phone_number": "",
//   "how_long": "",
//   "when_married": "",
//   "where_married": "",
//   "coza_how_long": "",
//   "use_pictures": ""
// }

// put wedding ded
// {
//   "author": "",
//   "name": "",
//   "contact_address": "",
//   "phone_number": "",
//   "how_long": "",
//   "when_married": "",
//   "where_married": "",
//   "coza_how_long": "",
//   "use_pictures": ""
// }

// put vehicle ded
// {
//   "vehicle_type": "",
//   "vehicle_owner": "",
//   "vehicle_owner_occupation": "",
//   "vehicle_owner_address": "",
//   "vehicle_owner_email": "",
//   "vehicle_owner_phone": ""
// }