const Event  = require('../models/Event');
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse.js");
const ActiveEvent = require('../models/ActiveEvent');

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::CREATING EVENTS::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const createEVent = asyncHandler(async(req, res, next) =>{

    let {
        eventName,
        coverImage,
        description,
        venue,
        date,
        time,
        eventType,
        eventURL,
        isLive
    } =  req.body;

    const newEvent = new Event({
        eventName,
        coverImage,
        description,
        venue,
        date,
        time,
        eventType,
        eventURL,
        isLive
    });

    newEvent.save()
    .then(event =>{
        res.status(200).json({
            success: true,
            message: 'event created successfully',
            data: event
        })
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
const getAllEvent = asyncHandler(async (req, res, next) =>{
    let onlineEvent =  await Event.find({isLive:true});
    console.log("this are online event", onlineEvent)
    // finding all events
    Event.find()
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

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::EXPORTING ALL FUNCTIONS::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
module.exports = {
    createEVent,
    getAllEvent,
    getSingleEvent,
    editEvent,
    deleteEvent,
    getActiveEvent 
}