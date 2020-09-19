const Sermon = require("../models/Sermon");
const SermonCategory = require("../models/SermonCategory");
const _ = require("lodash");
module.exports = {
  sermon_limit: 20,
  createSermon: async function(req, res) {
    try {
      var {
        title,
        author,
        category,
        content_type,
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
      var sermon = await Sermon({
        title,
        author,
        category,
        content_type,
        description,
        status,
        subscription_type,
        cover_image,
        price,
      });

      if (!sermon) {
        return res.status(400).json({
          success: false,
          message:
            "Unable to create sermon, please check the data and try again",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Sermon created successfully",
        data: sermon,
      });
    } catch (err) {
      //log error here
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
        .limit(this.sermon_limit);

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
  //update sermon
  updateSermon: async function(req, res) {
    try {
      const sermon_id = req.params.sermon;
      var check_sermon = await Sermon.findOne({
        _id: sermon_id,
      }).countDocuments();
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

  //delete sermon
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

  //create sermon category
  createSermonCategory: async function(req, res) {
    try {
      var name = req.body.name;

      var sermon_category = await SermonCategory.findOneAndUpdate(
        { name },
        { $set: { name } },
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

  //list sermon category
  listSermonCategories: async function(req, res) {
    try {
      const sermon_category = await SermonCategory.find({ isDeleted: false })
        .sort({
          name: "asc",
        })
        .exec();

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
  //update sermon category
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

  //delete sermon category
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
        sermon: deleted,
      });
    } catch (error) {
      return res.status(500).json({
        succes: false,
        message: "Error while deleting sermon category",
        data: error,
      });
    }
  },
};
