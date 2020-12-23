const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/department.controller');

router
.route('/')
.post(departmentController.createDepartment)
.get(departmentController.allDepartment)

router
.route('/single-department')
.get(departmentController.singleDepartment)

router
.route('/delete-department')
.delete(departmentController.deletedDepartment)

router
.route('/edit-department')
.put(departmentController.editDepartment)



module.exports = router