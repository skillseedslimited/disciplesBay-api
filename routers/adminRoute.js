const indexController = require('../controllers/admin/index');
const RolesController = require('../controllers/admin/roles')
const express = require('express');
const { verifyToken, authorize } = require('../middlewares/authJwt');
const router = express.Router();


router.all('/*', (req, res, next)=>{
    req.app.locals.layout = 'admin';
    next()
});

// @route Get /
// @desc adds
// @access Public
router
.route('/admin')
.get(indexController.index);

router
.route('/role')
.post(verifyToken, authorize('admin'), RolesController.createRole)
.get(verifyToken,RolesController.getRoles)

router
.route('/role/:id')
.delete(verifyToken, authorize('admin'), RolesController.deleteRole)


 module.exports = router;