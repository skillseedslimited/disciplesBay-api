// const CronJob = require('cron').CronJob,
//     request = require('request'),
//     helpers = require('../helpers/helpers'),
//     config = require('../config/ffmpeg.config'),
//     port = config.rtmp_server.http.port;

// const job = new CronJob('*/5 * * * * *', function () {
//     request
//         .get('http://127.0.0.1:' + port + '/api/streams', function (error, response, body) {
//             let streams = JSON.parse(body);
//             if (typeof (streams['live'] !== undefined)) {
//                 let live_streams = streams['live'];
//                 for (let stream in live_streams) {
//                     if (!live_streams.hasOwnProperty(stream)) continue;
//                     helpers.generateStreamThumbnail(stream);
//                 }
//             }
//         });
// }, null, true);

// module.exports = job;
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// const cron = require('node-cron');
// request = require('request');
// const  Event = require('../models/Event');
// const ActiveEvent = require('../models/ActiveEvent');
// const express = require('express');
// const router = express.Router();

// router.post("/", (_, res) =>{
//     try{
//         cron.schedule(
//             `${2} * * * * *`,
//             async ()=>{
//                 await Event.find({isLive:true})
//                 .then(event =>{
//                     console.log("this are the event", event);
//                 })
//             },
//             {
//                 scheduled: true,
//                 timezone:"Africa/Algiers"
//             }
//         );
//         res.status(200).json({
//             success: true,
//             message:"Live stream cron job started!!"
//         });
//     }catch(error){
//         res.json({
//             success:false,
//             message:"Unable to start live stream cron job"
//         })
//     }
// })

// module.exports = router;
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const cron = require('node-cron');
request = require('request');
const  Event = require('../models/Event');
const ActiveEvent = require('../models/ActiveEvent');
const express = require('express');
const router = express.Router();
let goCron = cron.schedule(
    `${2} * * * * *`,
    async ()=>{
        await Event.find({$and:[{passed:false}, {isLive:true}]})
        .then(event =>{
            // console.log("this are the event, are you?", event);
            let currentEvent = (current) =>{
                let time = new Date();
                let  t1 = time.getTime();
                let t2 = current.date.getTime();  
                // console.log("#######################################",current)
                return t1 <= t2; 
            }
            // console.log("new out put",event.findIndex(currentEvent));
            let indexElement = event.findIndex(currentEvent);
            currentEventstream = event[indexElement];
            
            // *********************************
        const activeEventFields = {};
        let eventURL = currentEventstream.eventURL;
        let coverImage = currentEventstream.coverImage;
        if(eventURL) activeEventFields.eventURL = currentEventstream.eventURL;
        if(coverImage) activeEventFields.coverImage = currentEventstream.coverImage;

        ActiveEvent.find()
            .then(events =>{
                let event = events[0]
                if(event){
                    console.log(event)
                    let id = event._id
                    // update
                    ActiveEvent.findOneAndUpdate( 
                        { _id: id },
                        { $set: activeEventFields },
                        { new: true }
                        )
                        .then(event =>{
                            console.log("new live stream url updated",event)
                        });
                }else{
                    // create
                    new ActiveEvent(activeEventFields).save()
                    .then(event =>{
                        console.log("new live stream url created", event);
                    });

                }
            })
            .catch(err => {
                console.log(err)
            });

            // console.log("**************************",currentEventstream)
            
        })
    },
    {
        scheduled: true,
        timezone:"Africa/Algiers"
    }
);
// res.status(200).json({
//     success: true,
//     message:"Live stream cron job started!!"
// });{$and:[{ role: counsel  },{ isOnline: stat }, {counselorCat:category}]}
// ::::::::::::
// const array1 = [5, 12, 8, 130, 44];

// const isLargeNumber = (element) => element > 13;

// console.log(array1.findIndex(isLargeNumber));
// // expected output: 3

module.exports = goCron;


