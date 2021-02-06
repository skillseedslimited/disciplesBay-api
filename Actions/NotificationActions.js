const firebaseadmin = require("../config/firebase");
require("dotenv").config();
const Notification = require("../models/Notification");
const moment = require("moment");
const User = require("../models/User");
const { isObject } = require("lodash");
module.exports = {
  sendToGeneral: function (themessage, type, resource_link, heading) {
    var message = {
      notification: {
        title: 'New Notification Alert',
        body:  themessage
       
      },
      data: {
        themessage,
        resource_link,
        type,
        created_at: moment().format(),
      },
      android: {
        notification: {
          sound: 'default',
          click_action: 'FLUTTER_NOTIFICATION_CLICK',
        },
      },
      topic: "general",
    };

    firebaseadmin
      .messaging()
      .send(message)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    //save notification
    //using general for notification id so we dont do multiple entry for users
    var notification = new Notification({
      message: themessage,
      resource_link,
      notification_id: "general",
      type: "general",
      heading
    });
    notification.save(function (err) {
      if (err) return null;
      // saved!
    });
    if (notification) {
      //notification saved
      console.log("notification saved");
    }
    //update all user notification counter
    User.updateMany({}, { $inc: { notificationCounter: 1 } }, function (
      err,
      doc
    ) {
      if (err) {
        //plug to bugsnac here
        console.log(err);
      }
    }).exec();
  },

  sendToUser: async function (user, themessage, type, resource_link) {
    var registrationToken = user.deviceToken;
if(registrationToken)
{
  var message = {
    notification: {
      title: 'New Notification Alert',
      body:  themessage
      },
    data: {
      themessage,
      resource_link,
      type,
      created_at: moment().format(),
    },
    android: {
      notification: {
        sound: 'default',
        click_action: 'FLUTTER_NOTIFICATION_CLICK',
      },
    },
    token: registrationToken,
  };
  // console.log(registrationToken);f

  firebaseadmin
    .messaging()
    .send(message)
    .then((response) => { console.log(response)})
    .catch((error) => {
      console.log("Error sending message:", error);
    });
  var notification = new Notification({
    message : themessage,
    resource_link,
    notification_id: user._id,
    type: "individual",
  });
  await notification.save();
  await User.findByIdAndUpdate(user._id, {
    $inc: { notificationCounter: 1 },
  }).exec();
  return true;
}
   
  },
  //   storeUsersNotiication: async function (
  //     group_users,
  //     message,
  //     image,
  //     resource_link
  //   ) {
  //     var user_ids = group_users.map((group_user) => {
  //       if (_.isObject(group_user.user)) {
  //         //it a user
  //         return group_user.user._id;
  //       }
  //       if (_.isObject(group_user.admin)) {
  //         //it an admin
  //         return group_user.admin._id;
  //       }
  //     });
  //     var notifications = [];
  //     for (const userId in user_ids) {
  //       if (user_ids[userId] != "undefined")
  //         notifications.push({
  //           message,
  //           image,
  //           resource_link,
  //           notification_id: user_ids[userId],
  //           type: "group",
  //         });
  //     }
  //     // console.log(notifications)

  //     Notification.insertMany(notifications)
  //       .then((docs) => {})
  //       .catch((err) => {
  //         console.log(err);
  //       });

  //     //update all user notification counter
  //     await User.updateMany(
  //       { _id: { $in: user_ids } },
  //       { $inc: { notificationCounter: 1 } }
  //     ).exec();
  //   },

  subscribeToTopic: function (registrationTokens, topic) {
    // console.log(registrationTokens);
    firebaseadmin
      .messaging()
      .subscribeToTopic(registrationTokens, topic)
      .then(function (response) {
        console.log("Successfully subscribed to topic:", response);
      })
      .catch(function (error) {
        console.log("Error subscribing to topic:", error);
      });
  },
  //   sendNoty: async function (resource, type) {
  //     if (resource.recepients == "everyone") {
  //       firebase_helper.sendToGeneral(resource, type);
  //       firebase_helper.sendCoachGeneral(resource, type);
  //     } else {
  //       if (resource.recepients == "coaches") {
  //         firebase_helper.sendCoachGeneral(resource, type);
  //       }
  //       if (resource.recepients == "participants") {
  //         firebase_helper.sendToGeneral(resource, type);
  //       }
  //     }
  //   },

  sendCommunication: async function (user, themessage, type,channel_name,call_type ,sender) {
    var registrationToken = user.deviceToken;
    if(registrationToken)
    {
      var message = {
        notification: {
          title: 'New Notification Alert',
          body:  themessage
         
          },
          android: {
            notification: {
              sound: 'default',
              click_action: 'FLUTTER_NOTIFICATION_CLICK',
            },
          },
        data: {
          themessage,
          channel_name,
          type,
          call_type,
          created_at: moment().format(),
          sender_name : sender.username
        },
        token: registrationToken,
      };
  
      firebaseadmin
        .messaging()
        .send(message)
        .then((response) => {})
        .catch((error) => {
          console.log("Error sending message:", error);
        });
    }
   
    // var notification = new Notification({
    //   themessage,
    //   resource_link,
    //   notification_id: user._id,
    //   type: "individual",
    // });
    // await notification.save();
    // await User.findByIdAndUpdate(user._id, {
    //   $inc: { notificationCounter: 1 },
    // }).exec();
    return true;
  },

  sendChat: async function (user, themessage, type,sender) {
    var registrationToken = user.deviceToken;
    if(registrationToken)
    {
      var message = {
        notification: {
          title: 'New chat notification',
          body:  themessage
          },
        data: {
          themessage,
          type,
          createdAt: moment().format(),
          sender_name : sender.username
        },
        android: {
          notification: {
            sound: 'default',
            click_action: 'FLUTTER_NOTIFICATION_CLICK',
          },
        },
        token: registrationToken,
      };
  
      firebaseadmin
        .messaging()
        .send(message)
        .then((response) => {})
        .catch((error) => {
          console.log("Error sending message:", error);
        });
    }
   
    // var notification = new Notification({
    //   themessage,
    //   resource_link,
    //   notification_id: user._id,
    //   type: "individual",
    // });
    // await notification.save();
    // await User.findByIdAndUpdate(user._id, {
    //   $inc: { notificationCounter: 1 },
    // }).exec();
    return true;
  },
};
