const cron = require('node-cron');
const NotificationAction = require("../Actions/NotificationActions");
const Event  = require('../models/Event');

// Schedule tasks to be run on the server at 4:00 am.
cron.schedule('0 4 * * *', function() {
  NotificationAction.sendToGeneral(
    `Hello, its time to Decree Your Day with Pastor Modele Fatyinbo. We celebrate you!`,
    "devotion",
    "#",
    `Daily Decree`
  );
}); 


// CRON JOB FOR REOCCURRING EVENTS
// Schedule tasks to be run on the server at 4:00 am.
// let getEvents = async () => {
//   // let AllEvents = await Event.find({reoccurrant: true});
//   // console.log(AllEvents)
// }  

// getEvents()


// cron.schedule('0 4 * * *', function() {
 
// }); 