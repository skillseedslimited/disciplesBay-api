const Store = require("../models/Store");
const Sermon = require("../models/Sermon");
const _ = require("lodash");
const conn = require("mongoose").connection;
const Payment = require("../Actions/PaymentActions"); 
const UserSermon = require("../models/UserSermon");
const Transaction = require("../models/Transaction");
const User = require('../models/User');
const { response } = require("express"); 
const { forEach } = require("lodash");
const { findByIdAndDelete } = require("../models/User");
module.exports = { 
  store_limit: 40, 
  deleteNull: async (req, res) => {
    res.send(req.params.id) 
    Store.findByIdAndDelete(req.params.id)
      .then(item => {
        res.status(200).json(item)
      })
  },

  fetchAllStoreContents: async function (req, res) {
    try {
      // ::::::::::::::::content of login user:::::::::::::::::::::::::
      let user = req.user._id;
      Purchase = await UserSermon.find({user});
      let user_sermon = [];
      Purchase.forEach(sermon =>{
        let sermon1 = sermon.sermon_id
        user_sermon.push(sermon1);
      })
      const page = req.query.page && req.query.page > 0 ? req.page : 1;
      const content_type = req.query.content_type || null;
      let query = {};
      if (content_type) {
        query = { content_type };
      }
      // let all_contents = await Store.find(query)
      //   .sort({ createdAt: "desc" })
      //   .skip((page - 1) * this.store_limit)
      //   .limit(this.store_limit)
      //   .lean()
      //   .exec();
      let all_contents = await Store.find({ item: { $nin: [ ...user_sermon ] } })
        .sort({ createdAt: "desc" })
        .skip((page - 1) * this.store_limit)
        .limit(this.store_limit)
        .lean()
        .exec();
      console.log("all content", all_contents)              
      all_contents = await this.processStoreContents(all_contents);

      var store_count = await Store.find({}).countDocuments();
      var number_of_pages = Math.ceil(store_count / page);
      if(!all_contents){
        all_contents = []
      }
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
  
  processStoreContents: async function (all_contents) {
    let contents = [];
    for (let content of all_contents) {
      // console.log(all_contents)
      // console.log("this is a content", content)
      if (content.item_type == "sermon") {
        let sermon = await Sermon.findOne({ _id: content.item })
          .select("-content")
          .lean()
          .exec();

        content["item"] = sermon;
        contents.push(content);
      }
      
    }
    return contents;
  },

  fetchSingleStoreContent: async function (req, res) {
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
  updateStoreContent: async function (req, res) {
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
  purchaseStoreItem: async function (req, res) {
    try {
      let item_id = req.params.item;
      const item = await Store.findOne({ _id: item_id }).exec();
      if (!item) {
        return res
          .status(400)
          .json({ success: false, message: "Item not found in store" });
      }
      var gift = "gift" in req.body && req.body.gift == true ? true : false;
      if (gift && !("receiver" in req.body)) {
        throw Error("Receiver is a compulsory when gifting item");
      }
      switch (req.body.gateway) {
        case "paypal":
          return await this.payWithPaypal(
            item,
            req.body.payment_id,
            req.body.payer_id,
            req.user,
            gift,
            req.body.receiver
          );
          break;
        case "flutterwave":
          return await this.payWithFlutterWave(req,res,
            item,
            req.body.payment_id,
            req.user,
            gift,
            req.body.receiver
          );
          break;
        default:
          return res
            .status(500)
            .json({ success: false, message: "Invalid gateway selected " });
      }
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Unable to complete payment please try again",
        });
    }
  },
  //gift someone
  payWithPaypal: async function (
    item,
    payment_id,
    payer_id,
    user,
    gift,
    receiver
  ) {
    //get the price of the item
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
        "store",
        payment_id,
        payer_id,
        amount,
        user,
        "Purchase of " + store_content.title + " " + item.item_type
      );

      if (resp.success == false) {
        //error occuered
        return res.status(500).json(resp);
      }
      //payment succcessfull
      var receiver_id = gift == true ? receiver._id : req.user._id;

      if (item.item_type == "sermon") {
        //add sermon to user sermon collections
        var user_sermon = new UserSermon({
          user: receiver_id,
          sermon_id: store_content._id,
        });

        await user_sermon.save();
        if (!user_sermon) {
          throw Error("Unable to save sermon for this user");
        }
      }
      //log transaction here

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
  payWithFlutterWave: async function (req,res,
    item,
    transaction_ref,
    user,
    gift,
    receiver
  ) {
    try {
      if (item.item_type == "sermon") {
        store_content = await Sermon.findOne({ _id: item.item._id }).exec();
        if (!store_content) {
          throw Error("Sermon not found");
        }
      }

      var amount = store_content.price;
      //execute paypal
      var resp = await Payment.verifyFlutterwave(
        "store",
        transaction_ref,
        user,
        "Purchase of " + store_content.title + " " + item.item_type,
        amount
      );

      if (resp.success == false) {
        //error occuered
        return res.status(500).json(resp);
      }
      //payment succcessfull
      var receiver_id = gift == true ? receiver._id : req.user._id;
      if (item.item_type == "sermon") {
        //add sermon to user sermon collections

        var user_sermon = new UserSermon({
          user: receiver_id,
          sermon_id: store_content._id,
        });

        await user_sermon.save();
        if (!user_sermon) {
          throw Error("Unable to save sermon for this user");
        }
      }

      //log transaction here

      return res.status(200).json({
        success: true,
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
  // ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::web payment module::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //buy
  webPurchaseStoreItem: async function (req, res) {
    try {
      let item_id = req.params.item;
      const item = await Store.findOne({ _id: item_id }).exec();
      if (!item) {
        return res
          .status(400)
          .json({ success: false, message: "Item not found in store" });
      }
      var gift = "gift" in req.body && req.body.gift == true ? true : false;
      if (gift && !("receiver" in req.body)) {
        throw Error("Receiver is a compulsory when gifting item");
      }
      switch (req.body.gateway) {
        case "paypal":
          return await this.payWithPaypal(
            item,
            req.body.payment_id,
            req.body.payer_id,
            req.user,
            gift,
            req.body.receiver
          );
          break;
        case "flutterwave":
          return await this.webPayWithFlutterWave(req,res,
            item,
            req.body.payment_id,
            req.user,
            gift,
            req.body.receiver
          );
          break;
        default:
          return res
            .status(500)
            .json({ success: false, message: "Invalid gateway selected " });
      }
    } catch (error) {
      return res
        .status(500)
        .json({
          success: false,
          message: "Unable to complete payment please try again",
        });
    }
  },
  webPayWithFlutterWave: async function (req,res,
    item,
    transaction_ref,
    user,
    gift,
    receiver
  ) {
    try {
      if (item.item_type == "sermon") {
        store_content = await Sermon.findOne({ _id: item.item._id }).exec();
        if (!store_content) {
          throw Error("Sermon not found");
        }
      }

      var amount = store_content.price;
      //execute paypal
      var resp = await Payment.verifyFlutterwave(
        "store",
        transaction_ref,
        user,
        "Purchase of " + store_content.title + " " + item.item_type,
        amount
      );

      if (resp.success == false) {
        //error occuered
        return res.status(500).json(resp);
      }
      //payment succcessfull
      var receiver_id = gift == true ? receiver._id : req.user._id;
      if (item.item_type == "sermon") {
        //add sermon to user sermon collections

        var user_sermon = new UserSermon({
          user: receiver_id,
          sermon_id: store_content._id,
        });

        await user_sermon.save();
        if (!user_sermon) {
          throw Error("Unable to save sermon for this user");
        }
      }

      //log transaction here

      return res.status(200).json({
        success: true,
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
  webFetchSingleStoreContent: async function (req, res) {
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
  webGetAllStore:async(req, res, next) =>{
    await Store.find()
    .populate("item")
    .then(store =>{
      res.status(200).json({
        success:true,
        message:"All store item",
        data:store
      })
    })
    .catch(err =>{
      res.status(400).json({
        success:true,
        message:"Unable to get store items",
        data:err
      })
    })
  },
  // :::::::::::::::::::::::give store item:::::::::::::::::::::::::::::::::::::::::::
  gift:async(req, res, next) =>{
    let receiver_id = req.query.receiver_id;
    let store_item = req.query.store_item;
    let store_content = await Store.findById(store_item);
    console.log(store_content.item)
    if(!store_content){
      return res.status(400).json({
        success:false,
        message:"Store item can not be found"
      })
    }
    var user_sermon = new UserSermon({
      user: receiver_id,
      sermon_id: store_content.item,
    });

    await user_sermon.save()
    .then(sermon =>{
      res.status(200).json({
        success:true,
        message:"Gift sent successfully",
        data:sermon
      })
    })
    if (!user_sermon) {
      throw Error("Unable to save sermon for this user");
    }
  }
};
