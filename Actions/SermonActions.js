const Sermon = require("../models/Sermon");
const SermonCategory = require("../models/SermonCategory");
const Store = require("../models/Store");
const _ = require("lodash");
const { array } = require("joi");
const conn = require("mongoose").connection;

module.exports = {
  sermon_limit: 20,
  createSermon: async function(req, res) {
    try {
      var {
        title,
        author,
        category,
        content_type,
        content,
        description,
        status,
        subscription_type,
        cover_image,
        price,
      } = req.body;

      var category_obj = await SermonCategory.findOne({ _id: category });
      if (!category_obj) {
        return res.status(400).json({
          success: false,
          message: "Selected category not found",
        });
      }
      var sermon = Sermon({
        title,
        author,
        category,
        content_type,
        description,
        status,
        content,
        subscription_type,
        cover_image,
        price,
        isDeleted: false,
      });
      if (!sermon) {
        return res.status(400).json({
          success: false,
          message:
            "Unable to create sermon, please check the data and try again",
        });
      }
      //push item to store if it not free
      if (sermon.subscription_type != "free") {
        let item_to_store = new Store({
          item: sermon._id,
          item_type: "sermon",
          quantity: 0,
          content_type: sermon.content_type,
        });
        await item_to_store.save();
        if (!item_to_store) {
          return res.status(400).json({
            success: false,
            message:
              "Unable to create sermon, please check the data and try again",
          });
        }
      }

      await sermon.save();
      return res.status(200).json({
        success: true,
        message: "Sermon created successfully",
        data: sermon,
      });
    } catch (err) {
      //log error here
      console.log(err);
      return res.status(500).json({
        succes: false,
        message: "Error while creating sermon",
        data: err,
      });
    }
  },
  listSermons: async function(req, res) {
    try {
      const page = req.query.page && req.query.page > 0 ? req.page : 1;
      const sermons = await Sermon.find({ isDeleted: false })
        .sort({ createdAt: "desc" })
        .skip((page - 1) * this.sermon_limit)
        .limit(this.sermon_limit)
        .exec();

      //prepare pagination of sermon list
      var sermon_counts = await Sermon.find({}).countDocuments();
      var number_of_pages = Math.ceil(sermon_counts / page);
      return res.status(200).json({
        succes: true,
        message: "Sermons fetched successfully",
        list: { sermons, current_page: page, number_of_pages },
      });
    } catch (error) {
      //log error here
      return res.status(500).json({
        succes: false,
        message: "Error while creating sermon",
        data: error,
      });
    }
  },
  updateSermon: async function(req, res) {
    try {
      const sermon_id = req.params.sermon;

      var check_sermon = await Sermon.findById(sermon_id)
        .countDocuments()
        .exec();

      if (check_sermon <= 0) {
        return res.status(404).json({
          success: false,
          message: "Sermon not found",
        });
      }
      const sermon_obj = _.pick(req.body, [
        "title",
        "author",
        "category",
        "content_type",
        "description",
        "status",
        "subscription_type",
        "cover_image",
        "price",
        "content",
      ]);
      //check category is sent

      if (sermon_obj.category) {
        var category_obj = await SermonCategory.findOne({
          _id: sermon_obj.category,
        });
        if (!category_obj) {
          return res.status(400).json({
            success: false,
            message: "Selected category not found",
          });
        }
      }

      var updated = await Sermon.findOneAndUpdate(
        { _id: sermon_id },
        { $set: sermon_obj },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "Sermon updated successfully",
        sermon: updated,
      });
    } catch (error) {
      return res.status(500).json({
        succes: false,
        message: "Error while updating sermon",
        data: error,
      });
    }
  },
  deleteSermon: async function(req, res) {
    try {
      const sermon_id = req.params.sermon;
      var sermon = await Sermon.findById(sermon_id);
      if (!sermon) {
        return res.status(404).json({
          success: false,
          message: "Sermon not found",
        });
      }

      const sermon_in_store = await Store.exists({ item: sermon._id }).exec();
      if (sermon_in_store) {
        var sermon_removed_from_store = await Store.findOneAndUpdate(
          { item: sermon_id },
          { $set: { isDeleted: true } },
          { new: true }
        );
      }
      var deleted = await Sermon.findOneAndUpdate(
        { _id: sermon_id },
        { $set: { isDeleted: true } },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "Sermon deleted successfully",
        sermon: deleted,
      });
    } catch (error) {
      return res.status(500).json({
        succes: false,
        message: "Error while deleteing sermon",
        data: error,
      });
    }
  },
  getSermon: async function(req, res) {
    try {
      const sermon_id = req.params.sermon;
      var sermon = await Sermon.findById(sermon_id)
        .populate("SermonCategory")
        .exec();
      if (!sermon) {
        return res.status(404).json({
          success: false,
          message: "Sermon not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Sermon fetched successfully",
        sermon,
      });
    } catch (error) {
      return res.status(500).json({
        succes: false,
        message: "Error while fetching sermon",
        data: error,
      });
    }
  },
  createSermonCategory: async function(req, res) {
    try {
      var name = req.body.name;

      var sermon_category = await SermonCategory.findOneAndUpdate(
        { name },
        { $set: { name, isDeleted: false } },
        { new: true, upsert: true }
      ).exec();
      if (!sermon_category) {
        return res.status(400).json({
          success: false,
          message:
            "Unable to create sermon category , please check the data and try again",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Sermon  category created successfully",
        data: sermon_category,
      });
    } catch (err) {
      //log error here
      return res.status(500).json({
        succes: false,
        message: "Error while creating category",
        data: err,
      });
    }
  },
  listSermonCategories: async function(req, res) {
    try {
      var sermon_category = await SermonCategory.find({ isDeleted: false })
        .sort({
          name: "asc",
        })
        .exec();

      console.log(sermon_category);

      return res.status(200).json({
        succes: true,
        message: "Sermon categories fetched successfully",
        list: sermon_category,
      });
    } catch (error) {
      //log error here
      return res.status(500).json({
        succes: false,
        message: "Error while fetching sermon categories",
        data: error,
      });
    }
  },
  updateSermonCategory: async function(req, res) {
    try {
      var name = req.body.name;
      var category_id = req.params.category;

      var sermon_category = await SermonCategory.findByIdAndUpdate(
        category_id,
        { name },
        { new: true }
      ).exec();

      if (!sermon_category) {
        return res.status(400).json({
          success: false,
          message:
            "Unable to update sermon category , please check the data and try again",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Sermon category updated successfully",
        data: sermon_category,
      });
    } catch (err) {
      //log error here
      return res.status(500).json({
        succes: false,
        message: "Error while updating category",
        data: err,
      });
    }
  },
  fetchSingleSermonCategory: async function(req, res) {
    try {
      const category_id = req.params.category;
      var sermon_category = await SermonCategory.findById(category_id);
      if (!sermon_category) {
        return res.status(404).json({
          success: false,
          message: "Sermon Category not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Sermon category fetched successfully",
        data: sermon_category,
      });
    } catch (error) {
      return res.status(500).json({
        succes: false,
        message: "Error while deleting sermon category",
        data: error,
      });
    }
  },
  deleteSermonCategory: async function(req, res) {
    try {
      const category_id = req.params.category;
      var sermon_category = await SermonCategory.findById(category_id);
      if (!sermon_category) {
        return res.status(404).json({
          success: false,
          message: "Sermon Category not found",
        });
      }
      var sermon_category = await SermonCategory.findByIdAndUpdate(
        category_id,
        { isDeleted: true },
        { new: true }
      ).exec();
      return res.status(200).json({
        success: true,
        message: "Sermon category deleted successfully",
        sermon: sermon_category,
      });
    } catch (error) {
      return res.status(500).json({
        succes: false,
        message: "Error while deleting sermon category",
        data: error,
      });
    }
  },

  //fetch user sermons
  fetchUserSermons: async function(req, res) {
    try {
      const content_type = req.query.content_type
        ? req.query.content_type
        : null;
      const page = req.query.page && req.query.page > 0 ? req.page : 1;

      let query = { subscription_type: "free" };
      if (content_type) {
        query["content_type"] = content_type;
      }

      let sermons = await Sermon.find(query)
        .sort({ createdAt: "desc" })
        .skip((page - 1) * this.store_limit)
        .limit(this.store_limit)
        .lean()
        .exec();

      return res.status(200).json({
        success: true,
        message: "User sermons fetched successfully",
        sermons,
      });
      //fetch bought sermons
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Unable to fetch user sermons",
        error,
      });
    }
  },
};
