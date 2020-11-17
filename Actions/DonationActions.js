const Donation = require("../models/Donation");
const Partnership = require("../models/Partnership");
const UserPartnership = require("../models/UserPartnership");
const FlutterwavePartnership = require("../models/FlutterwavePartnership");
const Payment = require("../Actions/PaymentActions");
const moment = require("moment");
module.exports = {

  fetchAllDonations: async function (req, res) {
    try {
      const page = req.query.page ? req.query.page : 1;
      const donations = await Donation.find({})
        .populate("user", "username email picture")
        .sort({ createdAt: "desc" })
        .skip((page - 1) * 20)
        .limit(20)
        .exec();
      return res.status(200).json({
        success: true,
        message: "Donations fetched successfully",
        donations,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occured please try again",
        error: error,
      });
    }
  },

  fetchUserDonations: async function (req, res) {
    try {
      const page = req.query.page ? req.query.page : 1;
      const donations = await Donation.find({ user: req.user._id })
        .populate("user", "username email picture")
        .sort({ createdAt: "desc" })
        .skip((page - 1) * 20)
        .limit(20)
        .exec();
      return res.status(200).json({
        success: true,
        message: "Donations fetched successfully",
        donations,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occured please try again",
        error: error,
      });
    }
  },
  //create partnerships
  createPartnership: async function (req, res) {
    try {
      var { name, amount, frequency } = req.body;
      var donation = new Partnership({ name, amount, frequency });
      await donation.save();
      if (!donation) {
        return res.status(400).send({
          success: false,
          message: "Unable to create partnership",
        });
      }

      return res.status(200).json({
        success: true,
        message: "partnership created successfully",
        donation,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Unable to create partneship, please check and retry",
        error,
      });
    }
  },
  //list all partnerships
  listPartnerShips: async function (req, res) {
    try {
      const partnerships = await Partnership.find({ isDeleted: false }).exec();

      return res.status(200).json({
        success: true,
        message: "Donations fetched successfully",
        partnerships,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occured please try again",
        error: error,
      });
    }
  },
  //  update partnerships
  updatePartnership: async function (req, res) {
    try {
      var { name, amount, frequency } = req.body;
      var partnership_id = req.params.partnership;
      var partnership = await Partnership.findById(partnership_id).exec();
      if (!partnership) {
        return res.status(404).json({
          success: false,
          message: "Partnership not found",
        });
      }
      var updated = await Partnership.findByIdAndUpdate(
        partnership_id,
        { name, amount, frequency },
        { new: true }
      ).exec();
      if (!updated) {
        return res.status(400).send({
          success: false,
          message: "Unable to update partnership",
        });
      }

      return res.status(200).json({
        success: true,
        message: "partnership updated successfully",
        partnership: updated,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Unable to create partneship, please check and retry",
        error,
      });
    }
  },
  //delete partnerships
  deletePartnership: async function (req, res) {
    try {
      var partnership_id = req.params.partnership;
      var partnership = await Partnership.findById(partnership_id).exec();
      if (!partnership) {
        return res.status(404).json({
          success: false,
          message: "Partnership not found",
        });
      }
      var updated = await Partnership.findByIdAndUpdate(
        partnership_id,
        { isDeleted: true },
        { new: true }
      ).exec();
      if (!updated) {
        return res.status(400).send({
          success: false,
          message: "Unable to update partnership",
        });
      }

      return res.status(200).json({
        success: true,
        message: "partnership deleted successfully",
        partnership: updated,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Unable to create partneship, please check and retry",
        error,
      });
    }
  },
  //fetch active partnerships
  fetchActivePartnership: async function (req, res) {
    try {
      const page = req.query.page ? req.query.page : 1;
      const user_partnerships = await UserPartnership.find({ status: "active" })
        .populate("user", "username email picture")
        .populate("partnership", "name amount frequency")
        .sort({ createdAt: "desc" })
        .skip((page - 1) * 20)
        .limit(20)
        .exec();
      return res.status(200).json({
        success: true,
        message: "User partnerships fetched successfully",
        user_partnerships,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occured please try again",
        error: error,
      });
    }
  },
  fetchUserActivePartnership: async function (req, res) {
    try {
      const page = req.query.page ? req.query.page : 1;
      const user_partnerships = await UserPartnership.find({
        user_id: req.user._id,
      })
        .populate("user", "username email picture")
        .populate("partnership", "name amount frequency")
        .sort({ createdAt: "desc" })
        .skip((page - 1) * 20)
        .limit(20)
        .exec();
      return res.status(200).json({
        success: true,
        message: "User partnerships fetched successfully",
        user_partnerships,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occured please try again",
        error: error,
      });
    }
  },
  giveWithFlutterWave : async function(payment_id,user,amount,req, res) {
    try {

      var narrative = "Donation of " + amount + "by " + user.username;

      var resp = await Payment.verifyFlutterwave(
        "donation",
        payment_id,
        user,
        narrative,
        amount
      );
        console.log(resp.success)
      if (resp.success == false) {
        //error occuered
        return res.status(500).json(resp);
      }
      //save donation
      var donation = new Donation({
        user,
        amount,
        narrative,
        donation_type: "single",
        gateway: "flutterwave",
      });

      await donation.save();

      if (!donation) {
        throw Error("Unable to complete donation, Unknown error");
      }
      return res.status(200).json({
        success: true,
        message: "Donation sent successfully",
      });
    } catch (error) {
     console.log(error)
      return res.status(500).json({
        success: false,
        message: "Unable to complete payment please try again",
        error,
      });
    }
  },
  //   give donation
  giveDonation: async function (req, res) {
    var { amount, gateway } = req.body;
    try {
     if(gateway == "paypal")
     {
          if (
            !("payment_id" in req.body) ||
            !("payer_id" in req.body) ||
            !("amount" in req.body)
          ) {
            return res.status(400).json({
              success: false,
              message: "Some fields are missing try again",
            });
          }
          return await this.giveWithPaypal(
            req.body.payment_id,
            req.body.payer_id,
            req.user,
            amount
          );
      }
      if(gateway == "flutterwave")
      {
    
          if (!("payment_id" in req.body) || !("amount" in req.body)) {
            return res.status(400).json({
              success: false,
              message: "Some fields are missing try again",
            });
          }
          // console.log(await this.giveWithFlutterWave)
          // console.log(this.giveWithFlutterWave)
           let resp = await this.giveWithFlutterWave(
            req.body.payment_id,
            req.user,
            amount,
            req,
            res
          );
          return resp;
          
        }
      
      return res
            .status(500)
            .json({ success: false, message: "Invalid gateway selected " });
      
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        success: false,
        message: "Unable to complete payment please try again",
        error,
      });
    }
  },

  giveWithPaypal: async function (payment_id, payer_id, user, amount) {
    try {
      var narrative = "Donation of " + amount + "by " + user.username;

      var resp = await Payment.executePaypalPayment(
        "donation",
        payment_id,
        payer_id,
        amount,
        user,
        narrative
      );

      if (resp.success == false) {
        //error occuered
        return res.status(500).json(resp);
      }
      //save donation
      var donation = new Donation({
        user,
        amount,
        narrative,
        donation_type: "single",
        gateway: "paypal",
      });

      await donation.save();

      if (!donation) {
        throw Error("Unable to complete donation, Unknown error");
      }
      return res.status(200).json({
        success: true,
        message: "Donation sent successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Unable to complete payment please try again",
        error,
      });
    }
  },
 
  subscribeToPartnership: async function (req, res) {
    var { amount, gateway } = req.body;
    try {
      var partnership_id = req.params.partnership;
      var partnership = await Partnership.findById(partnership_id).exec();
      if (!partnership) {
        return res.status(404).json({
          success: false,
          message: "Partnership not found",
        });
      }
      switch (gateway) {
        case "paypal":
        //   return await this.giveWithPaypal(
        //     req.body.payment_id,
        //     req.body.payer_id,
        //     req.user,
        //     amount
        //   );
        //   break;
        case "flutterwave":
          if (!("payment_id" in req.body)) {
            return res.status(400).json({
              success: false,
              message: "Some fields are missing try again",
            });
          }
          return await this.subscribeWithFlutterwavePartnership(
            partnership,
            req.body.payment_id,
            req.user
          );
          break;
        default:
          return res
            .status(500)
            .json({ success: false, message: "Invalid gateway selected " });
      }
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Unable to complete payment please try again",
        error,
      });
    }
  },
  subscribeWithFlutterwavePartnership: async function (
    partnership,
    payment_id,
    user
  ) {
    try {
      var resp = await Payment.verifyFlutterwave(
        "donation",
        payment_id,
        user,
        narrative,
        partnership.amount
      );

      if (resp.success == false) {
        //error occuered
        return res.status(500).json(resp);
      }
      //save donation
      var donation = new Donation({
        user: user._id,
        amount,
        narrative,
        donation_type: "partnership",
        gateway: "flutterwave",
      });

      await donation.save();

      if (!donation) {
        throw Error("Unable to complete donation, Unknown error");
      }

      //use the response to setup flutterwave partnership
      if (resp.response) {
        var flutterwavepartnership = new FlutterwavePartnership({
          user: user._id,
          token: resp.response.data.card.token,
          user: JSON.stringify(resp.response.data.customer),
        });

        await flutterwavepartnership.save();
        var user_partnership_save = new UserPartnership({
          user_id: user._id,
          partnership_id: partnership._id,
          user_partnership: flutterwavepartnership._id,
          status: "active",
          gateway: "flutterwave",
          amount: amount,
          next_charge: this.resolvePartnershipFrequency(partnership.frequency),
        });
        await user_partnership_save.save();
      }
      return res.status(200).json({
        success: true,
        message: "Donation sent successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Unable to complete payment please try again",
        error,
      });
    }
  },
  resolvePartnershipFrequency(frequency) {
    var day = 30;
    if (frequency == "quaterly") {
      day = 120;
    }
    if (frequency == "yearly") {
      day = 365;
    }

    return moment().add(day, "days").format("YYYY-MM-DD");
  },
  chargePartnershipSubscription: async function () {
    var user_partnerships = await UserPartnership.find({
      status: "active",
      next_charge: moment().format("YYYY-MM-DD"),
    })
      .populate("user partnership")
      .exec();
    for (var prtnerships of user_partnerships) {
      if (prtnerships.gateway == "flutterwave") {
        this.chargeWithFlutterwave(prtnerships.user, prtnerships);
      }
    }
  },
  chargeWithFlutterwave: async function (user, user_partnership) {
    var partnership = user_partnership.partnership;
    var amount = partnership.amount;
    var flutterwavepartnership = await FlutterwavePartnership.findById(
      user_partnership.user_partnership
    ).exec();

    if (!flutterwavepartnership) {
      //return fails
    }
    //charge token
    var narrative = `Donation of ${amount} was successfull`;
    var resp = await Payment.chargeWithToken(
      "donation",
      user,
      flutterwavepartnership.user,
      flutterwavepartnership.token,
      narrative,
      amount
    );

    if (resp.success == true) {
      //update user partnership
      //store donation
      var donation = new Donation({
        user: user._id,
        amount,
        narrative,
        donation_type: "partnership",
        gateway: "flutterwave",
      });

      await donation.save();

      var flutterwavepartnership = await FlutterwavePartnership.findOneAndUpdate(
        { user: user._id },
        {
          token: resp.response.data.card.token,
          user: JSON.stringify(resp.response.data.customer),
        }
      ).exec();

      var user_partnership_save = UserPartnership.findOneAndUpdate(
        {
          user_id: user._id,
          gateway: "flutterwave",
          partnership_id: partnership._id,
        },
        {
          user_partnership: flutterwavepartnership._id,
          status: "active",
          gateway: "flutterwave",
          amount: amount,
          next_charge: this.resolvePartnershipFrequency(partnership.frequency),
        }
      ).exec();

      //   return res.status(200).json({
      //       success : true,
      //       message : ""
      //   })
    }
  },
}
