const Kids = require("../models/Kids");
const KidsCategory = require("../models/KidsCategory");
const Store = require("../models/Store");
const _ = require("lodash");
const { array } = require("joi");
const UserSermon = require("../models/UserSermon");
const { identity } = require("lodash");
const conn = require("mongoose").connection;
const NotificationAction = require("../Actions/NotificationActions");
module.exports = {
  sermon_limit: 20,
  createKids: async function (req, res) {
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

      var category_obj = await KidsCategory.findOne({ _id: category });
      if (!category_obj) {
        return res.status(400).json({
          success: false,
          message: "Selected category not found",
        });
      }
      var kids = Kids({
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
      if (!kids) {
        return res.status(400).json({
          success: false,
          message:
            "Unable to create Kids content, please check the data and try again",
        });
      }
      //push item to store if it not free
      if (kids.subscription_type != "free") {
        let item_to_store = new Store({
          item: kids._id,
          item_type: "sermon",
          quantity: 0,
          content_type: kids.content_type,
        });
        await item_to_store.save();
        if (!item_to_store) {
          return res.status(400).json({
            success: false,
            message:
              "Unable to create kids content, please check the data and try again",
          });
        }
      }
    //   NotificationAction.sendToGeneral(
    //     `A new Kids content: (${title}) has just been posted in the app `,
    //     "sermon",
    //     "#"
    //   );

      await kids.save();
      return res.status(200).json({
        success: true,
        message: "Kids content created successfully",
        data: kids,
      });
    } catch (err) {
      //log error here
      console.log(err);
      return res.status(500).json({
        succes: false,
        message: "Error while creating kids content",
        data: err,
      });
    }
  },
  listKids: async function (req, res) {
    try {
      const page = req.query.page && req.query.page > 0 ? req.page : 1;
      const kids = await Kids.find({$and:[{ isDeleted: false }, { subscription_type:"free" }]}) 
        .populate("category")
        .sort({ createdAt: "desc" })
        .skip((page - 1) * this.sermon_limit)
        .limit(this.sermon_limit)
        .exec();
      
      //prepare pagination of sermon list
      var kids_counts = await Kids.find({}).countDocuments();
      var number_of_pages = Math.ceil(kids_counts / page);
      return res.status(200).json({
        succes: true,
        message: "Kids content fetched successfully",
        list: { kids, current_page: page, number_of_pages },
      });
    } catch (error) {
      //log error here
      return res.status(500).json({
        succes: false,
        message: "Error while creating kids",
        data: error,
      });
    }
  },
  updateKids: async function (req, res) {
    try {
      const kids_id = req.params.kidsContent;

      var check_kids = await Kids.findById(kids_id)
        .countDocuments()
        .exec();

      if (check_kids <= 0) {
        return res.status(404).json({
          success: false,
          message: "Kids content not found",
        });
      }
      const kids_obj = _.pick(req.body, [
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

      if (kids_obj.category) {
        var category_obj = await KidsCategory.findOne({
          _id: kids_obj.category,
        });
        if (!category_obj) {
          return res.status(400).json({
            success: false,
            message: "Selected category not found",
          });
        }
      }
    
      var updated = await Kids.findOneAndUpdate(
        { _id: kids_id },
        { $set: kids_obj },
        { new: true }
      );
      //push item to store if it not free
      if (updated.subscription_type != "free") {
        let item_to_store = new Store({
          item: updated._id,
          item_type: "sermon",
          quantity: 0,
          content_type: updated.content_type,
        });
        await item_to_store.save();
        if (!item_to_store) {
          return res.status(400).json({
            success: false,
            message:
              "Unable to create kids content, please check the data and try again",
          });
        }
      }

      return res.status(200).json({
        success: true,
        message: "Kids content updated successfully",
        sermon: updated,
      });
    } catch (error) {
      return res.status(500).json({
        succes: false,
        message: "Error while updating kids content",
        data: error,
      });
    }
  },
  deleteKids: async function (req, res) {
    try {
      const kids_id = req.params.kidsContent;
      var kids = await Kids.findById(kids_id);
      if (!kids) {
        return res.status(404).json({
          success: false,
          message: "Kids content not found",
        });
      }
      const sermon_in_store = await Store.findOne({ item: kids._id }).exec();
      if (sermon_in_store) {
        var sermon_removed_from_store = await Store.findOneAndUpdate(
          { item: sermon_id },
          { $set: { isDeleted: true } },
          { new: true }
        );
        
      }
      console.log("@@@@@@@@@@@@@i reached here");
      var deleted = await Kids.findOneAndUpdate(
        { _id: kids_id },
        { $set: { isDeleted: true } },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "Kids content deleted successfully",
        sermon: deleted,
      });
    } catch (error) {
      return res.status(500).json({
        succes: false,
        message: "Error while deleting kids content",
        data: error,
      });
    }
  },
  getKids: async function (req, res) {
    
    try {
      const kids_id = req.params.kidsContent;
      var kids = await Kids.findById(kids_id)
        .populate("category")
        .exec();
      if (!kids) {
        return res.status(404).json({
          success: false,
          message: "Kids not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Kids content fetched successfully",
        kids,
      });
    } catch (error) {
      return res.status(500).json({
        succes: false,
        message: "Error while fetching kids content",
        data: error,
      });
    }
  },
  createKidsCategory: async function (req, res) {
    try {
      var name = req.body.name;

      var kids_category = await KidsCategory.findOneAndUpdate(
        { name },
        { $set: { name, isDeleted: false } },
        { new: true, upsert: true }
      ).exec();
      if (!kids_category) {
        return res.status(400).json({
          success: false,
          message:
            "Unable to create kids content category , please check the data and try again",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Kids content  category created successfully",
        data: kids_category,
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
  listKidsCategories: async function (req, res) {
    try {
      var kids_category = await KidsCategory.find({ isDeleted: false })
        .sort({
          name: "asc",
        })
        .exec();

      console.log(kids_category);

      return res.status(200).json({
        succes: true,
        message: "Kids content categories fetched successfully",
        list: kids_category,
      });
    } catch (error) {
      //log error here
      return res.status(500).json({
        succes: false,
        message: "Error while fetching kids categories",
        data: error,
      });
    }
  },
  updateKidsCategory: async function (req, res) {
    try {
      var name = req.body.name;
      var category_id = req.params.category;

      var kids_category = await KidsCategory.findByIdAndUpdate(
        category_id,
        { name },
        { new: true }
      ).exec();

      if (!kids_category) {
        return res.status(400).json({
          success: false,
          message:
            "Unable to update kids content category , please check the data and try again",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Kids content category updated successfully",
        data: kids_category,
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
  fetchSingleKidsCategory: async function (req, res) {
    try {
      const category_id = req.params.category;
      var kids_category = await KidsCategory.findById(category_id);
      if (!kids_category) {
        return res.status(404).json({
          success: false,
          message: "Kids content Category not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Kids content category fetched successfully",
        data: kids_category,
      });
    } catch (error) {
      return res.status(500).json({
        succes: false,
        message: "Error while fetching kids content category",
        data: error,
      });
    }
  },
  deleteKidsCategory: async function (req, res) {
    try {
      const category_id = req.params.category;
      var kids_category = await KidsCategory.findById(category_id);
      if (!kids_category) {
        return res.status(404).json({
          success: false,
          message: "Kids content Category not found",
        });
      }
      var kids_category = await KidsCategory.findByIdAndUpdate(
        category_id,
        { isDeleted: true },
        { new: true }
      ).exec();
      return res.status(200).json({
        success: true,
        message: "Kids content category deleted successfully",
        sermon: kids_category,
      });
    } catch (error) {
      return res.status(500).json({
        succes: false,
        message: "Error while deleting kids content category",
        data: error,
      });
    }
  },

  //fetch user sermons
  fetchUserSermons: async function (req, res) {
    try {
      let user = req.user._id;
      await UserSermon.find({user:user})
      .populate("sermon_id")
      .then(sermon =>{
        res.status(200).json({
          success:true,
          message:"Purchase sermons",
          data:sermon
        })
      })
      .catch(err =>{
        res.status(400).json({
          success:false,
          message:"Unable to get sermons",
          data:err
        })
      })
    //   const content_type = req.query.content_type
    //     ? req.query.content_type
    //     : null;
    //   const page = req.query.page && req.query.page > 0 ? req.page : 1;

    //   let query = { subscription_type: "free" };
    //   if (content_type) {
    //     query["content_type"] = content_type;
    //   }

    //   var user_sermons = await UserSermon.find({ user: req.user._id })
    //     .select("sermon_id -_id")
    //     .exec();

    //   var user_sermons =
    //     user_sermons == undefined
    //       ? []
    //       : user_sermons.map((sermon) => {
    //           return sermon.sermon_id.toString();
    //         });

    //   console.log(query);
    //   let sermons = await Sermon.find({
    //     $or: [{ subscription_type: "free" }, { _id: { $in: user_sermons } }],
    //   })
    //     .populate("category")
    //     .sort({ createdAt: "desc" })
    //     .skip((page - 1) * this.store_limit)
    //     .limit(this.store_limit)
    //     .lean()
    //     .exec();
    //   return res.status(200).json({
    //     success: true,
    //     message: "User sermons fetched successfully",
    //     sermons,
    //   });
    //   //fetch bought sermons
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Unable to fetch user sermons",
        error,
      });
    }
  },
//   featuredSermon:async(req, res, next) =>{
//     let id = req.query.id;
//     await Sermon.findById(id)
//     .then(sermon =>{
//       sermon.featured = true;
//       sermon.save();
//       res.status(200).json({
//         success: true,
//         message:'Sermon featured successfully',
//         data: sermon
//       })
//     })
//     .catch(err =>{
//       res.status(404).json({
//         success: false,
//         message: 'Unable to make sermon featured',
//         data:null
//       })
//     })
//   },
//   getFeaturedSermon:async(req, res, next) =>{
//     await Sermon.find({featured: true})
//     .then(sermon =>{
//       res.status(200).json({
//         success: true,
//         message:'All featured sermons',
//         data:sermon
//       })
//     })
//     .catch(err =>res.status(404).json({
//       success: false,
//       message:'Unable to get featured sermons',
//       data:null
//     }))
//   },
  // get sermon without pagination
  getKidsWithNoLimit:async(req, res, nesxt) =>{
    await Kids.find({$and:[{ isDeleted: false }, { subscription_type:"free" }]})
    .then(kids =>{
      res.status(200).json({
        success:true,
        message:'All kids content',
        data:kids
      })
    })
    .catch(err =>{
      res.status(200).json({
        success:false,
        message:"Unable to find kids content",
        data:null
      })
    })
  },

  getAdminKids:async(req, res, next) =>{
    await Kids.find()
    .then(kids =>{
      res.status(200).json({
        success:true,
        message:"All Kids content",
        data:kids
      })
    })
    .catch(err =>{
      res.status(404).json({
        success:false,
        message:"Unable to get Kids content",
        data:err
      })
    })
  },
//   unFeaturedSermon:async(req, res, next) =>{
//     let id = req.query.id;
//     await Sermon.findById(id)
//     .then(sermon =>{
//       sermon.featured = false;
//       sermon.save();
//       res.status(200).json({
//         success: true,
//         message:'Sermon un-featured successfully',
//         data: sermon
//       })
//     })
//     .catch(err =>{
//       res.status(404).json({
//         success: false,
//         message: 'Unable to make sermon featured',
//         data:null
//       })
//     })
//   },
};
