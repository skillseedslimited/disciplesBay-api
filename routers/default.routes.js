const defaultController = require("../controllers/default/index.controller");
const registerController = require("../controllers/default/register.controller");
const express = require("express");
const login = require("../controllers/default/login.controller");
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
router.post("/auth/login", login);

// @route Get verifyGetByEmail
// @desc verify user by email
// @access Public
router
  .route("/verifyGetByEmail/:secretToken")
  .get(registerController.verifyGetByEmail);

module.exports = router;
