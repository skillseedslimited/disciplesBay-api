const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../../models/User");
const Role = require("../../models/Role");

const config = require("../../config/auth.config");
const ErrorResponse = require("../../utils/errorResponse");
const asyncHandler = require("../../middleware/async");

const login = asyncHandler(async (req, res, next) => {
  const { id, password } = req.body;
  let query;

    query = User.findOne({$or:[{ username: id },{ phoneNumber: id }]}).populate({
        path: 'role',
        select: 'name'
    })
    //find user with id
    const user = await query;
    console.log(user);
     if(!user){
         return next(new ErrorResponse("User not found", 404));
     }
     //Verify that password matches saved password
     let passwordIsValid = bcrypt.compareSync(password, user.password.toString());
     if(!passwordIsValid){
        return next(new ErrorResponse("Invalid Password!", 401));
     }
     //sign jwt to user
    let expire =  2592000;
    let token = jwt.sign({ user }, config.secret, {
        expiresIn: expire // 30 days
    });

  return res.status(200).json({
    success: true,
    message: "User found",
    data: {
      user,
      token: token,
      tokenExpiresIn: expire,
    },
  });
});

module.exports = login;
