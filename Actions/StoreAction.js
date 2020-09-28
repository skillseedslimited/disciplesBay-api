const Store = require("../models/Store");
const Sermon = require("../models/Sermon");
const _ = require("lodash");
const conn = require("mongoose").connection;
const Payment = require("../Actions/PaymentActions");
const UserSermon = require("../models/UserSermon");
module.exports = {
  store_limit: 40,
  fetchAllStoreContents: async function(req, res) {
    try {
      const page = req.query.page && req.query.page > 0 ? req.page : 1;
      const content_type = req.query.content_type || null;
      let query = {};
      if (content_type) {
        query = { content_type };
      }
      let all_contents = await Store.find(query)
        .sort({ createdAt: "desc" })
        .skip((page - 1) * this.store_limit)
        .limit(this.store_limit)
        .lean()
        .exec();

      all_contents = await this.processStoreContents(all_contents);

      var store_count = await Store.find({}).countDocuments();
      var number_of_pages = Math.ceil(store_count / page);
      return res.status(200).json({
        succes: true,
        message: "Store contents fetched successfully",
        list: { all_contents, current_page: page, number_of_pages },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        succes: false,
        message: "Error! while fetching store content",
        error,
      });
    }
  },
  processStoreContents: async function(all_contents) {
    let contents = [];
    for (let content of all_contents) {
      if (content.item_type == "sermon") {
        let sermon = await Sermon.findOne({ _id: content.item })
          .select("-content")
          .lean()
          .exec();

        content["item"] = sermon;
        contents.push(content);
      }
      return contents;
    }
  },

  fetchSingleStoreContent: async function(req, res) {
    try {
      let item_id = req.params.item;
      const item = await Store.findOne({ _id: item_id }).exec();

      if (!item) {
        return res
          .status(400)
          .json({ success: false, message: "Item not found in store" });
      }
      let store_content = {};
      if (item.item_type == "sermon") {
        store_content = await Sermon.findOne({ _id: item.item._id })
          .select("-content")
          .lean()
          .exec();
      }

      return res.status(200).json({
        succes: true,
        message: "Store content fetched successfully",
        data: store_content,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(400)
        .json({ success: false, message: "Unable to fetch Store item", error });
    }
  },
  //add store item'
  //   addItemToStore: async function(req, res) {

  //   },
  //update store content quantity
  updateStoreContent: async function(req, res) {
    try {
      let item_id = req.params.item;
      var { quantity, status } = req.body;
      const item = await Store.findOne({ _id: item_id }).exec();
      if (!item) {
        return res
          .status(400)
          .json({ success: false, message: "Item not found in store" });
      }

      var updated = await Store.findOneAndUpdate(
        { _id: item_id },
        { quantity, status }
      ).exec();

      if (!updated) {
        return res
          .status(400)
          .json({ success: false, message: "Unable to update store content" });
      }

      return res.status(200).json({
        success: true,
        message: "Store quantity updated successfully",
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Unable to update store content",
        error,
      });
    }
  },

  //buy
  purchaseStoreItem: async function(req, res) {
    try {
      let item_id = req.params.item;
      const item = await Store.findOne({ _id: item_id }).exec();
      if (!item) {
        return res
          .status(400)
          .json({ success: false, message: "Item not found in store" });
      }
      switch (req.body.gateway) {
        case "paypal":
          return await this.payWithPaypal(item, payment_id, payer_id);
          break;
        default:
          return res
            .status(500)
            .json({ success: false, message: "Invalid gateway selected " });
      }
    } catch (error) {}
  },
  //gift someone
  payWithPaypal: async function(item, payment_id, payer_id) {
    //get the price ofthe item
    try {
      if (item.item_type == "sermon") {
        store_content = await Sermon.findOne({ _id: item.item._id }).exec();
        if (!store_content) {
          throw Error("Sermon not found");
        }
      }

      var amount = store_content.price;
      //execute paypal
      var resp = await Payment.executePaypalPayment(
        payment_id,
        payer_id,
        amount
      );

      if (resp.success == false) {
        //error occuered
        return res.status(500).json(resp);
      }
      //payment succcessfull
      if (item.item_type == "sermon") {
        //add sermon to user sermon collections
        var user_sermon = new UserSermon({
          user: req.user._id,
          sermon_id: store_content._id,
        });

        await user_sermon.save();
        if (!user_sermon) {
          throw Error("Unable to save sermon for this user");
        }
      }

      return res.status(200).json({
        succes: true,
        message: "Item purchased successfully",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Unable to fetch purchase item",
        error,
      });
    }
  },
  payWithFlutterWave: async function(item, transaction_ref) {},
};