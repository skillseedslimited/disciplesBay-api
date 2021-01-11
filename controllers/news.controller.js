const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse.js");
const News = require('../models/News');
const Broadcast = require('../models/Notification');



// :::::::::::::::::::::::::::::::::::::::::::::::::::::CREATING NEWS::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const createNews = asyncHandler(async (req, res, next) =>{
    // getting new  subject and body
    let {
        newsBody,
        subject,
        newsDate
    } = req.body;

    // creating new instance of a news
    let newNews = new News({
        newsBody,
        subject,
        newsDate
    });

    // saving news to database
    await newNews.save()
    .then(news =>{
        res.status(200).json({
            success: true,
            message: 'news created successfully',
            data: news
        })
    })
    .catch(err =>{
        return next( new ErrorResponse("Unable to create news", 404))
    })

})

// :::::::::::::::::::::::::::::::::::::::::::::::::::GETTING ALL NEWS:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const getAllNews = asyncHandler( async(req, res, next) =>{
    
    // finding news
    await Broadcast.find({type:'general'})
    .sort({_id: -1})
    .then(news =>{
        if(!news){
            return next( new ErrorResponse("no news available", 404))
        }
        console.log(news)
        res.status(200).json({
            success: true,
            message: 'news',
            data: news
        })
    })
    .catch(err => next( new ErrorResponse("no news available", 404)))
});

// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::GETTING A SINGLE NEWS :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const getSingleNews = asyncHandler( async(req, res, next) =>{

    // finding news by id
    News.findById({_id: req.params.id})
    .then(news =>{
        if(!news){
            return next( new ErrorResponse("no news available", 404))
        }

        res.status(200).json({
            success: true,
            data: news
        })
    })
    .catch(err => next(err));
});


// ::::::::::::::::::::::::::::::::::::::::::::::::::DELETING NEWS::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const deleteNews = asyncHandler( async(req, res, next) =>{
    // finding news by ID
    News.findById({_id: req.params.id})
    .then(news =>{
        if(!news){
            return next( new ErrorResponse('no news with this id', 404))
        }

        news.remove();

        res.status(200).json({
            success: true,
            message: 'news successfully deleted'
        })
    })
    .catch(err => next(err));
});



module.exports = {
    createNews,
    getAllNews,
    deleteNews,
    getSingleNews
}