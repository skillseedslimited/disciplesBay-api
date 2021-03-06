const express = require('express');
const router = express.Router();
const userMangementController = require('../controllers/userMangement.controller');

// @route /getAllUser
// @desc getting all users
// @access private
router.route('/all-users/:page')
  .get(userMangementController.getAllUsers);

// @route /getAllUser
// @desc getting all users
// @access private
router.route('/all-users')
  .get(userMangementController.allUsers);

 
// @route /getSingleUser
// @desc getting single user
// @access private
router
.route('/getSingleUser/:id')
.get(userMangementController.getSingleUser);

// @route /getSingleUser
// @desc getting single user
// @access private
router.route('/single-user-fullname')
  .post(userMangementController.getUserByFullName);

// @route /deleteUser
// @desc deleting user
// @access private
router
.route('/deleteUser/:id')
.delete(userMangementController.deleteUser);

// @route /suspendUser
// @desc suspending user
// @access private
router
.route('/suspendUser/:id')
.post(userMangementController.suspendUser);

// @route /unsuspendUser
// @desc unsuspending user
// @access private
router
.route('/unsuspendUser/:id')
.post(userMangementController.unsuspendUser);

// @route /assignUser
// @desc assign user a role
// @access private
router
.route('/assignuser/:roleId/:userId')
.post(userMangementController.assignUser);

// @route /creat_user
// @desc assign user a role
// @access private
router
.route('/create-user')
.post(userMangementController.createUser);

// @route /get-user-by-role
// @desc get users under a give role
// @access private
router
.route('/get-user-by-role')
.get(userMangementController.getUserByRole)

// @route /update-user
// @desc update a particular user
// @access private
router
.route('/update-user')
.put(userMangementController.editUser)


router
.route('/counter')
.get(userMangementController.counter);



module.exports = router
