const cron = require('node-cron');
const NotificationAction = require("../Actions/NotificationActions");
const Event  = require('../models/Event');

// Schedule tasks to be run on the server at 4:00 am.
let getEvents = async () => {
  let AllEvents = await Event.find({});
  console.log("")
}

cron.schedule('0 4 * * *', function() {
  NotificationAction.sendToGeneral(
    `Hello, its time to Decree Your Day with Pastor Modele Fatyinbo. We celebrate you!`,
    "devotion",
    "#",
    `Daily Decree`
  );
}); 