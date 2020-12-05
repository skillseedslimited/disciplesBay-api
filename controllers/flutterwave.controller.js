require("dotenv").config();
const FlutterwaveSchema = require("../models/FlutterwaveSettings");
const randomString = require("randomstring");
const Flutterwave = require("flutterwave-node-v3");
const open = require("open");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse.js");
// done another plsbbmbm plstnsmjhjhfkfsfksjfnhsjjdkjdjhad
// :::::::::::::::::::::::::::::::::::::::::::::::::::FLUTTERWAVE CARD CHARGES::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const chargeCard = asyncHandler(async (req, res, next) => {
  try {
    const flw = new Flutterwave(
      "FLWPUBK_TEST-8d0a295ee1a7bf791dd81ad8ab338662-X",
      "FLWSECK_TEST-fa43174bb9713015ad3b3c1078cbd2b1-X"
    );
    let {
      card_number,
      cvv,
      expiry_month,
      expiry_year,
      currency,
      amount,
      fullname,
      email,
      phone_number,
    } = req.body;

    let redirect_url = "aprotech1.herokuapp.com";
    let enckey = "FLWSECK_TEST51d12bd48199";
    let tx_ref = randomString.generate({ charset: "numeric" });

    const payload = new FlutterwaveSchema({
      card_number,
      cvv,
      expiry_month,
      expiry_year,
      currency,
      amount,
      redirect_url,
      fullname,
      email,
      phone_number,
      enckey,
      tx_ref,
    });

    const response = await flw.Charge.card(payload);
    console.log("plssssssssssssssssssss", response, payload);
    if (response.meta.authorization.mode === "pin") {
      let payload2 = payload;
      payload2.authorization = {
        mode: "pin",
        fields: ["pin"],
        pin: 3310,
      };
      const reCallCharge = await flw.Charge.card(payload2);

      const callValidate = await flw.Charge.validate({
        otp: "12345",
        flw_ref: reCallCharge.data.flw_ref,
      });
      console.log(callValidate);
    }
    if (response.meta.authorization.mode === "redirect") {
      var url = response.meta.authorization.redirect;
      open(url);
    }

    console.log(response);
    res.status(200).json({
      success: true,
      message: "payment successful",
      data: response,
    });
  } catch (error) {
    console.log(error);
    return next(new ErrorResponse("payment not successful", 404));
  }
});

module.exports = {
  chargeCard,
};
