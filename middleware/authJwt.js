const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const asyncHandler = require("./async.js");
const ErrorResponse = require("../utils/errorResponse.js");

const verifyToken = asyncHandler( async (req, res, next) => {
    //Get token from headers
  let token = req.headers["x-access-token"];

  if (!token) {
    return next(new ErrorResponse("Unauthorized access", 403));
  }
  //verify and decode token
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return next(new ErrorResponse("Unauthorized access", 401));
    }
    //store decoded token in request
    req.user = decoded.user
    next();
  });
});

const authorize = (...roles) => {
    return (req, res, next) => {
      //console.log(req.user)
        if (!roles.includes(req.user.role.name)) {
          return next(
            new ErrorResponse(
              `User role ${req.user.role.name} is not authorized to access this route`,
              403
            )
          );
        }
        next();
    };
};

const authJwt = {
    verifyToken,
    authorize
  };
  module.exports = authJwt;