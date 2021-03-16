const NotificationAction = require("../Actions/NotificationActions");
const User = require("../models/User");

module.exports = {
  subscribeUser: async function (req, res) {
    var updated = await User.findByIdAndUpdate(req.user._id, {
      $set: {
        deviceToken: req.body.token.trim(),
        deviceRegistered: true,
      },
    }).exec();
    // console.log("This is th token " + req.body.token);
    NotificationAction.subscribeToTopic(req.body.token, "general");
    return res.status(200).send({
      status: "success",
      message: "Registeration token set successfully",
    });
  },
  
  fetchUserNotifications: async function (req, res) {
    var page = req.query.page ? req.query.page : 1;
    try {
      var skip = (page - 1) * 20;
      var notifications = await Notification.find({
        $or: [{ type: "general" }, { notification_id: req.user._id }],
      })
        .sort({ createdAt: "desc" })
        .skip(skip)
        .limit(20)
        .exec();

      await User.findByIdAndUpdate(req.user._id, {
        notificationCounter: 0,
      }).exec();

      res.status(200).send({
        status: "success",
        message: "user notifications fetched successfully",
        notifications,
      });
    } catch (err) {
      res.status(500).send({
        status: "error",
        message: "Unable to fetch notifications",
        error: err,
      });
    }
  },
  
  postBroadcast: async function (req, res) {
    var { message, link, broadcast_type } = req.body;
    if (message == null || link == null) {
      return res.status(400).json({
        success: false,
        message: `${message == null ? "message" : "link"} is required field `,
      });
    }
    //post
    if (!req.body.broadcast_type) {
      return res.status(400).json({
        success: false,
        message: "broadcast_type is a required field",
      });
    } else {
      if (broadcast_type == "all") {
        NotificationAction.sendToGeneral(message, "broadcast", link);
      }

      if (broadcast_type == "individual") {
        var user = await User.findById(req.body.user_id).exec();
        if (user) {
          NotificationAction.sendToUser(user, message, "broadcast", link);
        } else {
          return res.status(500).json({
            success: false,
            message: "User not found",
          });
        }
      }
    }
    return res.status(200).json({
      success: true,
      message: "Broadcast sent successfully",
    });
  },
};
