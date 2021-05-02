const express = require('express');
const router = express.Router();
const branchController = require('../controllers/branch.controller');

router
.route('/')
.post(branchController.createBranch)
.get(branchController.allBranch)

router
.route('/single-branch')
.get(branchController.singleBranch)

router
.route('/delete-branch')
.delete(branchController.deleteBranch)

router
.route('/edit-branch')
.put(branchController.editBranch)



module.exports = router