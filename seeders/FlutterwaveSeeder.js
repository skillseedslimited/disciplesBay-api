const fs = require("fs");
const FlutterwaveSeeder = require("../models/FlutterwaveSettings");

module.exports = {
  up: async function() {
    try {
      var payment_types = ["store", "donation"];
      for (name of payment_types) {
        var flutterwave_settings = await FlutterwaveSeeder.findOneAndUpdate(
          { name },
          {
            public_key: "NO PUBKEY KEY",
            sec_key: "NO SECRET",
            enc_key: "NO ENCRYPT",
          },
          { upsert: true, setDefaultsOnInsert: true }
        );
      }
    } catch (error) {}
  },
};
