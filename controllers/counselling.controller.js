const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse.js");
const User = require("../models/User");
const Role = require("../models/Role");

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::GETTING ALL COUNSELLORS::::::::::::::::::::::::::::::::::::::::::::::::::
const counsellorAll = asyncHandler(async (req, res, next) => {
  // finding counsellor role and saving in a veriable
  let counsel = await Role.findOne({ name: "counsellor" });
  console.log(counsel);
  let status = Boolean;
  if (req.params.status == "true"){
    status = true;
    User.find({$and:[{ role: counsel  },{ isOnline: status }]})
    .populate({
        path: 'role',
        match: {name: {$gte: 'counsellor'}},
        select: 'name'
    })
    .then((counsellors) => {
      res.status(200).json({
        success: true,
        message: "All counsellors",
        data: counsellors,
      });
    })
    .catch((err) => {
      return next(new ErrorResponse("Unable to get counsellors..", 404));
    });
  }else if (req.params.status == "false"){
    status = false;
    User.find({$and:[{ role: counsel  },{ isOnline: status }]})
    .populate({
        path: 'role',
        match: {name: {$gte: 'counsellor'}},
        select: 'name'
    })
    .then((counsellors) => {
      res.status(200).json({
        success: true,
        message: "All counsellors",
        data: counsellors,
      });
    })
    .catch((err) => {
      return next(new ErrorResponse("Unable to get counsellors..", 404));
    });
  }else{
    User.find({role: counsel})
    .populate({
        path: 'role',
        match: {name: {$gte: 'counsellor'}},
        select: 'name'
    })
    .then((counsellors) => {
      res.status(200).json({
        success: true,
        message: "All counsellors",
        data: counsellors,
      });
    })
    .catch((err) => {
      return next(new ErrorResponse("Unable to get counsellors..", 404));
    });
  }

  // role: counsel
  // $and:[{ role: counsel  },{ isOnline: status }]
  // finding all users with role of counsellor
  // console.log("value:", status);
  // User.find({$and:[{ role: counsel  },{ isOnline: status }]})
  //   .populate({
  //       path: 'role',
  //       match: {name: {$gte: 'counsellor'}},
  //       select: 'name'
  //   })
  //   .then((counsellors) => {
  //     res.status(200).json({
  //       success: true,
  //       message: "All counsellors",
  //       data: counsellors,
  //     });
  //   })
  //   .catch((err) => {
  //     return next(new ErrorResponse("Unable to get counsellors..", 404));
  //   });
});

// :::::::::::::::::::::::::::::::::::::::::::::::::::::::GETTING A SINGLE COUNSELLOR:::::::::::::::::::::::::::::::::::::::::::::::::::::
const counsellorSingle = asyncHandler(async (req, res, next) => {
  let id = req.params.id;

  User.findOne({ _id: id })
    .then((counsellor) => {
      if (!counsellor) {
        return next(new ErrorResponse("Unable to find counsellor", 404));
      }

      res.status(200).json({
        success: true,
        message: "Counsellor",
        data: counsellor,
      });
    })
    .catch((err) => {
      return next(new ErrorResponse("Unable to find counsellor", 404));
    });
});
// :::::::::::::::::::::::::::::::::::::::::::::::::::::::::ONLINE STATUS::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const status = asyncHandler(async(req, res, next) =>{
  let user = req.user._id
  await User.findById(user)
  .then(user =>{
    if(user.isOnline == true){
       user.isOnline = false;
       user.save()
       .then(user =>{
        return res.status(200).json({
          success: true,
          message:'You are now offline',
          data:user
        })
       })
       
    }else if(user.isOnline == false){
      user.isOnline = true;
      user.save()
      .then(user =>{
        return res.status(200).json({
          success:true,
          message:'You are now online',
          data:user
        })
      })
      
    }
  })
  .catch(err =>{
    return next(new ErrorResponse("Unable to change login status", 404));
  })
})
// ::::::::::::::::::::::::::::::::::::::::::::::::::::::::COUNSELOR CATEGORY::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
const category = asyncHandler(async(req, res, next) =>{
  let cat = req.params.cat;
  await User.find({counselorCat:cat})
  .then(user =>{
    res.status(200).json({
      success:true,
      message:`${cat} category`,
      data: user
    })
  })
  .then(err =>{
    return next(new ErrorResponse("Unable to get counselor under this category", 404));
  })
})

module.exports = {
  counsellorAll,
  counsellorSingle,
  status,
  category
};
