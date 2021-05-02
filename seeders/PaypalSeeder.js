const fs = require("fs");
const PaypalSetting = require("../models/PaypalSetting");

module.exports = {
  up: async function() {
    try {
      var payment_types = ["store", "donation","mentor_subscription"];
      for (name of payment_types) {
        var paypal_setting = await PaypalSetting.findOneAndUpdate(
          { name },
          {
            client_id: "NO CLIENT ID",
            secret: "NO SECRET",
            api_url: "NO URL",
            redirect_url: "No URL",
            cancel_url: "No URL",
          },
          { upsert: true, setDefaultsOnInsert: true }
        );
      }
    } catch (error) {}
  },
};
