const PaymentSetting = require("../models/PaymentSetting");
const fetch = require("node-fetch");
module.exports = {
  fetchPaymentSettings: async function(req, res) {
    var payment_settings = await PaymentSetting.findOne({}).exec();
    if (!payment_settings) {
      payment_settings = {
        paypal: {
          client_id: null,
          secret: null,
          api_url: null,
          redirect_url: null,
          cancel_url: null,
        },
      };
    }
    return res.status(200).json({
      success: true,
      message: "Payment settings fetched successfully",
      payment_settings,
    });
  },
  updatePaymentSettings: async function(req, res) {
    //possible payment setttings
    // var possible_payments = ["paypal", "flutterwave", "stripe", "cashapp"];
    switch (req.body.gateway) {
      case "paypal":
        return await this.updatePaypalSettings(req, res);
        break;
      case "flutterwave":
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
  updatePaypalSettings: async function(req, res) {
    //check  has neccessary requirements
    try {
      var payment_settings = await PaymentSetting.findOne({}).exec();
      if (!payment_settings) {
        return res.status(404).json({
          success: false,
          message: "No payment gateway configured yet",
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
        console.log({ client_id, secret, api_url, redirect_url, cancel_url });
        payment_settings.paypal[0] = {
          client_id,
          secret,
          api_url,
          redirect_url,
          cancel_url,
        };
        await payment_settings.save();
        return res.status(200).json({
          success: true,
          message: "Paypal updated successfully",
          data: payment_settings,
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
  initiatePaypal: async function(req, res) {
    //get the setings
    try {
      var payment_settings = await PaymentSetting.findOne({}).exec();
      if (!payment_settings) {
        return res.status(404).json({
          success: false,
          message: "No payment gateway configured yet",
        });
      }
      fetch(
        payment_settings.paypal[0].api_url + "/v1/payments/payment",
        {
          method: "POST",
          auth: {
            user: payment_settings.paypal[0].client_id,
            pass: payment_settings.paypal[0].secret,
          },
          body: {
            intent: "sale",
            payer: {
              payment_method: "paypal",
            },
            transactions: [
              {
                amount: {
                  total: req.body.amount,
                  currency: "USD",
                },
              },
            ],
            redirect_urls: {
              return_url: payment_settings.paypal[0].redirect_url,
              cancel_url: payment_settings.paypal[0].cancel_url,
            },
            json: true,
          },
        },
        function(err, response) {
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

  executePaypalPayment: async function(payment_id, payer_id, amount) {
    try {
      var payment_settings = await PaymentSetting.findOne({}).exec();
      if (!payment_settings) {
        return {
          success: false,
          message: "No payment gateway configured yet",
        };
      }

      fetch(
        payment_settings.paypal[0].api_url +
          "/v1/payments/payment/" +
          payment_id +
          "/execute",
        {
          method: "POST",
          auth: {
            user: payment_settings.paypal[0].client_id,
            pass: payment_settings.paypal[0].secret,
          },
          body: {
            payer_id: payer_id,
            transactions: [
              {
                amount: {
                  total: amount,
                  currency: "USD",
                },
              },
            ],
          },
          json: true,
        },
        function(err, response) {
          if (err) {
            return {
              success: false,
              message: "Unable to process payment",
              error: err,
            };
          }
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
};
