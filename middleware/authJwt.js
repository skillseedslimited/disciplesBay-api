const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const asyncHandler = require("./async.js");
const ErrorResponse = require("../utils/errorResponse.js");
const User = require("../models/User");
const Role = require("../models/Role.js");
const RoleAndPermission = require("../models/RoleAndPermission.js");

const verifyToken = asyncHandler(async (req, res, next) => {
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
    req.user = decoded.user;

    next();
  });
});

//Permissioins based on roles
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

const authorizeUpdated = (permissions) => {
  return async (req, res, next) => {
    //console.log(req.user)
    //check user role permission is among this permissions accepted for this route
    var check_role = await RoleAndPermission.exists({
      role: req.user.role,
      permission_name: { $in: permissions },
    });

    if (!check_role) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role.name} is not authorized to access this route`,
          403
        )
      );
    }
    //check role has this permission
    next();
  };
};

const authJwt = {
  verifyToken,
  authorize,
  authorizeUpdated,
};
module.exports = authJwt;
