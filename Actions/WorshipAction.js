const Worship = require("../models/Worship");
const WorshipCategory = require("../models/WorshipCategory");
const Store = require("../models/Store");
const _ = require("lodash");
const { array } = require("joi");
const UserSermon = require("../models/UserSermon");
const { identity } = require("lodash");
const conn = require("mongoose").connection;
const NotificationAction = require("../Actions/NotificationActions");
module.exports = {
  sermon_limit: 20,
  createWorship: async function (req, res) {
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

      var category_obj = await WorshipCategory.findOne({ _id: category });

      if (!category_obj) {
        return res.status(400).json({
          success: false,
          message: "Selected category not found",
        });
      }

      var worship = Worship({
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

      if (!worship) {
        return res.status(400).json({
          success: false,
          message:
            "Unable to create worship content, please check the data and try again",
        });
      } 

      //push item to store if it not free
      if (worship.subscription_type != "free") {
        let item_to_store = new Store({
          item: worship._id,
          item_type: "sermon",
          quantity: 0,
          content_type: worship.content_type,
        });
        await item_to_store.save();
        if (!item_to_store) {
          return res.status(400).json({
            success: false,
            message:
              "Unable to create worship content, please check the data and try again",
          });
        }
      }
    //   NotificationAction.sendToGeneral(
    //     `A new worship content: (${title}) has just been posted in the app `,
    //     "sermon",
    //     "#"
    //   );

      await worship.save();
      return res.status(200).json({
        success: true,
        message: "Worship content created successfully",
        data: worship,
      });
    } catch (err) {
      //log error here
      console.log(err);
      return res.status(500).json({
        succes: false,
        message: "Error while creating worship content",
        data: err,
      });
    }
  },

  listWorship: async function (req, res) {
    try {
      const page = req.query.page && req.query.page > 0 ? req.page : 1;
      const worship = await Worship.find({$and:[{ isDeleted: false }, { subscription_type:"free" }]}) 
        .populate("category")
        .sort({ createdAt: "desc" })
        .skip((page - 1) * this.sermon_limit)
        .limit(this.sermon_limit)
        .exec();
      
      //prepare pagination of sermon list
      var worship_counts = await Worship.find({}).countDocuments();
      var number_of_pages = Math.ceil(worship_counts / page);
      return res.status(200).json({
        succes: true,
        message: "Worship content fetched successfully",
        list: { worship, current_page: page, number_of_pages },
      });
    } catch (error) {
      //log error here
      return res.status(500).json({
        succes: false,
        message: "Error while creating Worship content",
        data: error,
      });
    }
  },

  updateWorship: async function (req, res) {
    try {
      const worship_id = req.params.worshipContent;

      var check_worship = await Worship.findById(worship_id)
        .countDocuments()
        .exec();

      if (check_worship <= 0) {
        return res.status(404).json({
          success: false,
          message: "Worship content not found",
        });
      }
      const worship_obj = _.pick(req.body, [
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

      if (worship_obj.category) {
        var category_obj = await WorshipCategory.findOne({
          _id: worship_obj.category,
        });
        if (!category_obj) {
          return res.status(400).json({
            success: false,
            message: "Selected category not found",
          });
        }
      }
    
      var updated = await Worship.findOneAndUpdate(
        { _id: worship_id },
        { $set: worship_obj },
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
              "Unable to create worship content, please check the data and try again",
          });
        }
      }

      return res.status(200).json({
        success: true,
        message: "Worship content updated successfully",
        sermon: updated,
      });
    } catch (error) {
      return res.status(500).json({
        succes: false,
        message: "Error while updating worship content",
        data: error,
      });
    }
  },

  deleteWorship: async function (req, res) {
    try {
      const worship_id = req.params.worshipContent;
      var worship = await Worship.findById(worship_id);
      if (!worship) {
        return res.status(404).json({
          success: false,
          message: "Worship content not found",
        });
      }
      const sermon_in_store = await Store.findOne({ item: worship._id }).exec();
      if (sermon_in_store) {
        var sermon_removed_from_store = await Store.findOneAndUpdate(
          { item: worship_id },
          { $set: { isDeleted: true } },
          { new: true }
        );
        
      }
      console.log("@@@@@@@@@@@@@i reached here");
      var deleted = await Worship.findOneAndUpdate(
        { _id: worship_id },
        { $set: { isDeleted: true } },
        { new: true }
      );
      return res.status(200).json({
        success: true,
        message: "Worship content deleted successfully",
        sermon: deleted,
      });
    } catch (error) {
      return res.status(500).json({
        succes: false,
        message: "Error while deleting worship content",
        data: error,
      });
    }
  },

  getWorship: async function (req, res) {
    
    try {
      const worship_id = req.params.worshipContent;
      var worship = await Worship.findById(worship_id)
        .populate("category")
        .exec();
      if (!worship) {
        return res.status(404).json({
          success: false,
          message: "Worship not found",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Worship content fetched successfully",
        worship,
      });
    } catch (error) {
      return res.status(500).json({
        succes: false,
        message: "Error while fetching worship content",
        data: error,
      });
    }
  },

  createWorshipCategory: async function (req, res) {
    try {
      var name = req.body.name;

      var worship_category = await WorshipCategory.findOneAndUpdate(
        { name },
        { $set: { name, isDeleted: false } },
        { new: true, upsert: true }
      ).exec();
      if (!worship_category) {
        return res.status(400).json({
          success: false,
          message:
            "Unable to create worship content category , please check the data and try again",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Worship content  category created successfully",
        data: worship_category,
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

  listWorshipCategories: async function (req, res) {
    try {
      var worship_category = await WorshipCategory.find({ isDeleted: false })
        .sort({
          name: "asc",
        })
        .exec();

      console.log(worship_category);

      return res.status(200).json({
        succes: true,
        message: "Worship content categories fetched successfully",
        list: worship_category,
      });
    } catch (error) {
      //log error here
      return res.status(500).json({
        succes: false,
        message: "Error while fetching worship categories",
        data: error,
      });
    }
  },

  updateWorshipCategory: async function (req, res) {
    try {
      var name = req.body.name;
      var category_id = req.params.category;

      var worship_category = await WorshipCategory.findByIdAndUpdate(
        category_id,
        { name },
        { new: true }
      ).exec();

      if (!worship_category) {
        return res.status(400).json({
          success: false,
          message:
            "Unable to update worship content category , please check the data and try again",
        });
      }
      return res.status(200).json({
        success: true,
        message: "Worship content category updated successfully",
        data: worship_category,
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

  fetchSingleWorshipCategory: async function (req, res) {
    try {
      const category_id = req.params.category;
      var worship_category = await WorshipCategory.findById(category_id);
      if (!worship_category) {
        return res.status(404).json({
          success: false,
          message: "Worship content Category not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Worship content category fetched successfully",
        data: worship_category,
      });
    } catch (error) {
      return res.status(500).json({
        succes: false,
        message: "Error while fetching worship content category",
        data: error,
      });
    }
  },

  deleteWorshipCategory: async function (req, res) {
    try {
      const category_id = req.params.category;
      var worship_category = await WorshipCategory.findById(category_id);
      if (!worship_category) {
        return res.status(404).json({
          success: false,
          message: "Worship content Category not found",
        });
      }
      var worship_category = await WorshipCategory.findByIdAndUpdate(
        category_id,
        { isDeleted: true },
        { new: true }
      ).exec();
      return res.status(200).json({
        success: true,
        message: "Worship content category deleted successfully",
        sermon: worship_category,
      });
    } catch (error) {
      return res.status(500).json({
        succes: false,
        message: "Error while deleting worship content category",
        data: error,
      });
    }
  },

  //fetch user sermons
//   fetchUserSermons: async function (req, res) {
//     try {
//       let user = req.user._id;
//       await UserSermon.find({user:user})
//       .populate("sermon_id")
//       .then(sermon =>{
//         res.status(200).json({
//           success:true,
//           message:"Purchase sermons",
//           data:sermon
//         })
//       })
//       .catch(err =>{
//         res.status(400).json({
//           success:false,
//           message:"Unable to get sermons",
//           data:err
//         })
//       })
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
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json({
//         success: false,
//         message: "Unable to fetch user sermons",
//         error,
//       });
//     }
//   },
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
  getWorshipWithNoLimit:async(req, res, nesxt) => {
    await Worship.find({$and:[{ isDeleted: false }, { subscription_type:"free" }]})
    .then(worship =>{
      res.status(200).json({
        success:true,
        message:'All worship content',
        data:worship
      })
    })
    .catch(err =>{
      res.status(200).json({
        success:false,
        message:"Unable to find worship content",
        data:null
      })
    })
  },

  getAdminWorship:async(req, res, next) =>{
    await Worship.find()
    .then(worship =>{
      res.status(200).json({
        success:true,
        message:"All worship content",
        data:worship
      })
    })
    .catch(err =>{
      res.status(404).json({
        success:false,
        message:"Unable to get worship content",
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
