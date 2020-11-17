const PaymentSetting = require("../models/PaymentSetting");
const PaypalSetting = require("../models/PaypalSetting");
const FlutterwaveSettings = require("../models/FlutterwaveSettings");
const fetch = require("node-fetch");
const Transaction = require("../models/Transaction");
module.exports = {
  fetchPaymentSettings: async function (req, res) {
    var payment_settings = [];
    var paypal_settings = await PaypalSetting.find({}).exec();
    var flutterwave_settings = await FlutterwaveSettings.find({}).exec();
    // console.log(payment_settings);
    payment_settings.push({
      paypal: paypal_settings,
      flutterwave: flutterwave_settings,
    });
    console.log(payment_settings);

    return res.status(200).json({
      success: true,
      message: "Payment settings fetched successfully",
      settings: payment_settings,
    });
  },
  updatePaymentSettings: async function (req, res) {
    //possible payment setttings
    // var possible_payments = ["paypal", "flutterwave", "stripe", "cashapp"];
    switch (req.body.gateway) {
      case "paypal":
        return await this.updatePaypalSettings(req, res);
        break;
      case "flutterwave":
        return await this.updateFlutterwaveSettings(req, res);
        break;
      case "stripe":
        break;
      case "cashapp":
        break;
      default:
        return res
          .status(500)
          .json({ success: false, message: "Invalid gateway selected " });
    }
  },
  updatePaypalSettings: async function (req, res) {
    //check  has neccessary requirements
    try {
      var paypal_setting = await PaypalSetting.findOne({
        name: req.body.name,
      }).exec();
      if (!paypal_setting) {
        return res.status(404).json({
          success: false,
          message: "No payment gateway configured for paypal yet",
        });
      }
      if (
        "client_id" in req.body &&
        "secret" in req.body &&
        "redirect_url" in req.body &&
        "cancel_url" in req.body &&
        "api_url" in req.body
      ) {
        var { client_id, secret, api_url, redirect_url, cancel_url } = req.body;
        // console.log({ client_id, secret, api_url, redirect_url, cancel_url });
        var updated = await PaypalSetting.findOneAndUpdate(
          { name: req.body.name },
          {
            client_id,
            secret,
            api_url,
            redirect_url,
            cancel_url,
          },
          { new: true }
        ).exec();

        if (!updated) {
          return res.status(500).json({
            success: false,
            message: "Unable to update paypal setting",
          });
        }
        return res.status(200).json({
          success: true,
          message: "Paypal updated successfully",
          data: updated,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Some data are missing ,please check and try again",
        });
      }
    } catch (error) {
      //   console.log(error);
      return res.status(400).json({
        success: false,
        message: "Error while updating paypal settings",
        error,
      });
    }
  },
  initiatePayment: async function (req, res) {
    try {
      console.log(req.query);
      switch (req.query.gateway) {
        case "paypal":
          return await this.initiatePaypal(req, res);
          break;
        case "flutterwave":
          return await this.initiateFlutterwave(req, res);
          break;
        default:
          throw Error("No gateway is specified");
          break;
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Unable to initiate payment",
        error,
      });
    }
  },
  initiatePaypal: async function (req, res) {
    //get the setings
    try {
      var paypal_setting = await PaypalSetting.findOne({
        name: req.query.name,
      }).exec();
      if (!paypal_setting) {
        return res.status(404).json({
          success: false,
          message: "No payment gateway configured yet",
        });
      }
      fetch(
        paypal_setting.api_url + "/v1/payments/payment",
        {
          method: "POST",
          auth: {
            user: paypal_setting.client_id,
            pass: paypal_setting.secret,
          },
          body: {
            intent: "sale",
            payer: {
              payment_method: "paypal",
            },
            transactions: [
              {
                amount: {
                  total: req.query.amount,
                  currency: "NGN",
                },
              },
            ],
            redirect_urls: {
              return_url: paypal_setting.redirect_url,
              cancel_url: paypal_setting.cancel_url,
            },
            json: true,
          },
        },
        function (err, response) {
          if (err) {
            return res.status(500).json({
              success: false,
              message: "Unable to process payment",
              error: err,
            });
          }
          return res.status(200).json({
            success: true,
            message: "Payment ID fetched succesfufly",
            payment_id: response.body.id,
          });
        }
      );
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Unable to process payment",
        error,
      });
    }
  },

  executePaypalPayment: async function (
    name,
    payment_id,
    payer_id,
    amount,
    user,
    narrative
  ) {
    try {
      var paypal_setting = await PaypalSetting.findOne({ name }).exec();
      if (!paypal_setting) {
        return {
          success: false,
          message: "No payment gateway configured yet",
        };
      }

      fetch(
        paypal_setting.api_url +
          "/v1/payments/payment/" +
          payment_id +
          "/execute",
        {
          method: "POST",
          auth: {
            user: paypal_setting.client_id,
            pass: paypal_setting.secret,
          },
          body: {
            payer_id: payer_id,
            transactions: [
              {
                amount: {
                  total: amount,
                  currency: "NGN",
                },
              },
            ],
          },
          json: true,
        },
        function (err, response) {
          if (err) {
            return {
              success: false,
              message: "Unable to process payment",
              error: err,
            };
          }
          var transaction = new Transaction({
            user: user._id,
            transaction_id: Math.random * 10,
            narrative,
            transaction_type: name,
            amount,
          });
          transaction.save();
          return {
            success: true,
            message: "Payment successful",
          };
        }
      );
    } catch (error) {
      return {
        success: false,
        message: "Unable to process payment",
        error,
      };
    }
  },
  initiateFlutterwave: async function (req, res) {
    try {
      var flutterwave_settings = await FlutterwaveSettings.findOne({
        name: req.query.name,
      }).exec();
      if (!flutterwave_settings) {
        return res.status(404).json({
          success: false,
          message: "No payment gateway configured yet",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Flutterwave settings fetched successfully",
        flutterwave_settings,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Unable to initiate payment",
        error,
      });
    }
  },
  verifyFlutterwave: async function (
    name,
    transaction_ref,
    user,
    narrative,
    amount
  ) {
    var flutterwave_settings = await FlutterwaveSettings.findOne({
      name,
    }).exec();
  
    if (!flutterwave_settings) {
      return {
        success: false,
        message: "No payment gateway configured yet",
      };
    }
console.log(transaction_ref)
    var url = `https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/v2/verify`;
   let response =  await  fetch(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify({
          "txref": transaction_ref,
          "SECKEY" : flutterwave_settings.sec_key
        })
      });

     response = (await response.json())
      //log transaction
    //  console.log(response)
      if (response.status == "success") {
        if (response.data.amount == amount) {
          var transaction = new Transaction({
            user: user._id,
            transaction_id: transaction_ref,
            narrative,
            transaction_type: name,
            amount,
          });
          transaction.save();
          return {
            success: true,
            message: "Payment successfull",
            response: response.json(),
          };
        } else {
          return {
            success: false,
            message: "amount paid not equal to item price",
          };
        }
      } else {
        return {
          success: false,
          message: "Unable to process payment",
        };
      }
      
   
  },
  updateFlutterwaveSettings: async function (req, res) {
    //check  has neccessary requirements
    try {
      var flutterwave_settings = await FlutterwaveSettings.findOne({
        name: req.body.name,
      }).exec();
      if (!flutterwave_settings) {
        return res.status(404).json({
          success: false,
          message: "No payment gateway configured for flutterwave yet",
        });
      }
      if (
        "public_key" in req.body &&
        "sec_key" in req.body &&
        "enc_key" in req.body
      ) {
        var { public_key, sec_key, enc_key } = req.body;
        // console.log({ client_id, secret, api_url, redirect_url, cancel_url });
        var updated = await FlutterwaveSettings.findOneAndUpdate(
          { name: req.body.name },
          { public_key, sec_key, enc_key },
          { new: true }
        ).exec();

        if (!updated) {
          return res.status(500).json({
            success: false,
            message: "Unable to update flutterwave setting",
          });
        }
        return res.status(200).json({
          success: true,
          message: "Flutterwave updated successfully",
          data: updated,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Some data are missing ,please check and try again",
        });
      }
    } catch (error) {
      //   console.log(error);
      return res.status(400).json({
        success: false,
        message: "Error while updating flutterwave settings",
        error,
      });
    }
  },
  chargeWithToken: async function (
    name,
    user,
    user_data,
    token,
    narrative,
    amount
  ) {
    var flutterwave_settings = await FlutterwaveSettings.findOne({
      name,
    }).exec();
    if (!flutterwave_settings) {
      return {
        success: false,
        message: "No payment gateway configured yet",
      };
    }
    fetch(
      "https://api.flutterwave.com/v3/tokenized-charges",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${flutterwave_settings.sec_key}`,
        },
        body: {
          token: token,
          currency: "NGN",
          country: "country",
          amount,
          tx_ref: Math.random * 10,
          email: user_data.email,
        },
      },
      function (err, response) {
        if (err) {
          return {
            success: false,
            message: "Unable to process payment",
            error: err,
          };
        }
        var transaction = new Transaction({
          user: user._id,
          transaction_id: Math.random * 10,
          narrative,
          transaction_type: name,
          amount,
        });
        transaction.save();
        return {
          success: true,
          message: "Charge successful",
        };
      }
    );
  },
};
