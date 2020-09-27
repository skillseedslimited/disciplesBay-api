const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSettingSchema = new Schema({
  paypal: [
    {
      client_id: {
        type: String,
        default: null,
      },
      secret: {
        type: String,
        default: null,
      },
      api_url: {
        type: String,
        default: null,
      },
      redirect_url: {
        type: String,
        default: null,
      },
      cancel_url: {
        type: String,
        default: null,
      },
    },
  ],
  flutterwave: [
    {
      client_id: {
        type: String,
        default: null,
      },
      secret: {
        type: String,
        default: null,
      },
    },
  ],
});

module.exports = PaymentSetting = mongoose.model(
  "payment_settings",
  PaymentSettingSchema
);
