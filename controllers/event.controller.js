const Event  = require('../models/Event');
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse.js");
const ActiveEvent = require('../models/ActiveEvent');
const NotificationAction = require("../Actions/NotificationActions");

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::CREATING EVENTS::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const createEVent = asyncHandler(async(req, res, next) => {

    let {
        eventName,
        coverImage,
        description,
        venue,
        date,
        time,
        eventType,
        eventURL,
        videoURL,
        isLive
    } =  req.body;

    let passed = false;
    
    const newEvent = await new Event({
        eventName,
        coverImage,
        description,
        venue,
        date,
        time,
        eventType,
        eventURL,
        videoURL,
        isLive,
        passed
    });

    // res.json(newEvent) 

    newEvent.save()
    .then(event => {
        res.status(200).json({
            success: true,
            message: 'Event created successfully',
            data: event
        })

        NotificationAction.sendToGeneral(
            `A new event: (${eventName}) has just been posted in the app `,
            "event",
            "#",
            `${eventName}`
        );
    })
    .catch((err) =>{
        return next( new ErrorResponse(`Unable to create event`, 404))
    })   
})


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::EDITTING EVENTS::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 const editEvent = asyncHandler(async(req, res, next) =>{
    // const update = req.body;
    const id = req.params.id;
    const options = { new: true };
    // updated = {};
    const eventFields = {};
    if(req.body.eventName) eventFields.eventName = req.body.eventName;
    if(req.body.description) eventFields.description = req.body.description;
    if(req.body.eventType) eventFields.eventType = req.body.eventType;
    if(req.body.coverImage) eventFields.coverImage = req.body.coverImage;
    if(req.body.date) eventFields.date = req.body.date;
    if(req.body.time) eventFields.time = req.body.time;
    if(req.body.venue) eventFields.venue = req.body.venue;
    if(req.body.eventURL) eventFields.eventURL = req.body.eventURL;
    if(req.body.isLive) eventFields.isLive = req.body.isLive;


     await Event.findByIdAndUpdate(
        { _id: id }, 
        { $set: eventFields },
        { new: true }
     )
     .then(event =>{
         if(!event){
            return next( new ErrorResponse("Unable to update event", 404))
         }
        res.status(200).json({
            success: true,
            message: 'updated successfully',
            data: event
        })
     })
     .catch(() =>{
        return next( new ErrorResponse("Unable to update event", 404))
     })
 })


// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::GETTING ALL EVENTS:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const getAllEvent = asyncHandler(async (req, res, next) => { 
    let onlineEvent =  await Event.find({isLive: true});
    // console.log("this are online event", onlineEvent)
    // finding all events
    Event.find()
    .sort({date: -1})
    .then(event =>{
        res.status(200).json({
            sucess: true,
            message: 'all events',
            data: event
        })
    })
    .catch(err =>{ 
        return next( new ErrorResponse("Unable to Get events", 404))
    });

})

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::GETTING A SINGLE EVENT::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const getSingleEvent = asyncHandler((req, res, next) =>{

    // getting single event by parameter
    Event.findById({_id: req.params.id})
    .then(event =>{
        // checking if there is no event
        if(!event){
            return next( new ErrorResponse("Unable to get event", 404));
        }
        // displaying single event
        res.status(200).json({
            sucess:true,
            message:'single event',
            data:event
        })
    })
    .catch(err =>{
        return next( new ErrorResponse("Unable to get event", 404))
    })
})

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::DELETING AN EVENT:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const deleteEvent = asyncHandler(async (req, res, next) =>{
    
    // finding event by id
    await Event.findById({_id: req.params.id})
    .then(event =>{
        event.remove();
        res.status(200).json({
            sucess:true,
            message: 'event successfully deleted'
        })
    })
    .catch(err =>{
        return next( new ErrorResponse("Unable to delete event", 404))
    })
})

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::GET ALL ACTIVE EVENT ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const getActiveEvent = asyncHandler(async(req, res, next) =>{
    await ActiveEvent.find()
    .then(actives =>{
        let active = actives[0];
        res.status(200).json({
            success:true,
            message:'Active stream url event',
            data:active
        })
    })
})
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::AUTOMATIC LIVE STREAM EVENT RESET:::::::::::::::::::::::::::::::::::::::::::::::::::::
const reset = asyncHandler(async(req, res, next) =>{
    await Event.find({$and:[{passed:false}, {isLive:true}]})
        .then(event =>{
            // getting all event
            let currentEvent = (current) =>{
                let time = new Date();
                let  t1 = time.getTime();
                let t2 = current.date.getTime();  
                return t1 <= t2; 
            }
            let indexElement = event.findIndex(currentEvent);
            currentEventstream = event[indexElement];
            currentEventstream.passed = true;
            currentEventstream.save();
            // event.passed = true;
            // event.save();
            
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
                            res.status(200).json({
                                success: true,
                                message:"new live stream url updated",
                                data:event
                            })
                        })
                        .catch(err =>{
                            return next( new ErrorResponse("Unable to update live stream url", 404))
                        });
                }else{
                    // create
                    new ActiveEvent(activeEventFields).save()
                    .then(event =>{
                        console.log("new live stream url created", event);
                    })
                    .catch(err =>{
                        return next( new ErrorResponse("Unable to create live stream url", 404))
                    });

                }
            })
            .catch(err => {
                console.log(err)
                return next( new ErrorResponse("Unable to create live stream ", 404))
            });

            // console.log("**************************",currentEventstream)
            
        })
        .catch(err =>{
            console.log("unable to find any event at the moment")
            return next( new ErrorResponse("Unable to find any event at the moment ", 404))
        })
})
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::EXPORTING ALL FUNCTIONS::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
module.exports = {
    createEVent,
    getAllEvent,
    getSingleEvent,
    editEvent,
    deleteEvent,
    getActiveEvent, 
    reset
}