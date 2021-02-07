// const cron = require('node-cron');
// request = require('request');
// const  Event = require('../models/Event');
// const ActiveEvent = require('../models/ActiveEvent');
// const express = require('express');
// const router = express.Router();
// // 0 */3 * * *
// let goCron = cron.schedule(
//     `*/50 * * * * *`,
//     async ()=>{
//         await Event.find({$and:[{passed:false}, {isLive:true}]})
//         .then(event =>{
//             // getting all event
//             let currentEvent = (current) =>{
//                 let time = new Date();
//                 let  t1 = time.getTime();
//                 let t2 = current.date.getTime();  
//                 return t1 <= t2; 
//             }
//             let indexElement = event.findIndex(currentEvent);
//             currentEventstream = event[indexElement];
//             currentEventstream.passed = true;
//             currentEventstream.save();
//             // event.passed = true;
//             // event.save();
            
//             // *********************************
//         const activeEventFields = {};
//         let eventURL = currentEventstream.eventURL;
//         let coverImage = currentEventstream.coverImage;
//         if(eventURL) activeEventFields.eventURL = currentEventstream.eventURL;
//         if(coverImage) activeEventFields.coverImage = currentEventstream.coverImage;

//         ActiveEvent.find()
//             .then(events =>{
//                 let event = events[0]
//                 if(event){
//                     console.log(event)
//                     let id = event._id
                    
//                     // update
//                     ActiveEvent.findOneAndUpdate( 
//                         { _id: id },
//                         { $set: activeEventFields },
//                         { new: true }
//                         )
//                         .then(event =>{
//                             console.log("new live stream url updated",event)
//                         });
//                 }else{
//                     // create
//                     new ActiveEvent(activeEventFields).save()
//                     .then(event =>{
//                         console.log("new live stream url created", event);
//                     });

//                 }
//             })
//             .catch(err => {
//                 console.log(err)
//             });

//             // console.log("**************************",currentEventstream)
            
//         })
//         .catch(err =>{
//             return console.log("unable to find any event at the moment")
//         })
//     },
//     {
//         scheduled: true,
//         timezone:"Africa/Algiers"
//     }
// );


// module.exports = goCron;


