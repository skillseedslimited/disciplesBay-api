const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FlutterwaveSettingsSchema = new Schema({
  name: {
    type: String,
    default: null,
    required: true,
  },
  public_key: {
    type: String,
    default: null,
    required: true,
  },
  enc_key: {
    type: String,
    default: null,
    required: true,
  },
  sec_key: {
    type: String,
    default: null,
    required: true,
  },
});

module.exports = FlutterwaveSettings = mongoose.model(
  "flutterwave_settings",
  FlutterwaveSettingsSchema
);
