const express = require('express');
const router = express.Router();
const RolesController = require('../controllers/roles.controller');
const { authorize } = require('../middleware/authJwt');

router
.route('/:id')
.delete(authorize('admin'), RolesController.deleteRole )

router
.route('/')
.post(authorize('admin'), RolesController.createRole )
.get( RolesController.getRoles )

module.exports = router