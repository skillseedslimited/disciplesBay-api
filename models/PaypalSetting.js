const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaypalSchema = new Schema({
  name: {
    type: String,
    default: null,
    required: true,
  },
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
});

module.exports = PaypalSetting = mongoose.model("paypals", PaypalSchema);
