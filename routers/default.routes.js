const defaultController = require("../controllers/default/index.controller");
const registerController = require("../controllers/default/register.controller");
const express = require("express");
const loginController = require("../controllers/default/login.controller");
const router = express.Router();

router.all("/*", (req, res, next) => {
  req.app.locals.layout = "default";
  next();
});

// @route Get /
// @desc adds
// @access Public
router.route("/").get(defaultController.index);

// @route post
// @desc authenticate user
// @access Public
router.post("/auth/register", registerController.register);
router.post("/auth/login", loginController);

// @route Get verifyGetByEmail
// @desc verify user by email
// @access Public
router
  .route("/verifyGetByEmail/:secretToken")
  .get(registerController.verifyGetByEmail);

// @route Get verifyGetByEmail
// @desc verify user by email
// @access Public
router
.route('/verify-email')
.post(defaultController.valEmail);

// @route Get verifyGetByEmail
// @desc verify user by email
// @access Public
router
.route('/verify-token')
.post(defaultController.verifyToken);

// @route Get verifyGetByEmail
// @desc verify user by email
// @access Public
router
.route('/change-password')
.post(defaultController.changePassword);

module.exports = router;
