const indexController = require('../controllers/default/index.controller');
const RolesController = require('../controllers/roles.controller');
const DevotionsController = require('../controllers/devotion.controller')
const express = require('express');
const { verifyToken, authorize } = require('../middleware/authJwt');
const { multerUploads } = require('../middleware/multer');
const testimonyController = require('../controllers/testimony.controller');
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
.get( indexController.index );

router
.route('/role')
.post( RolesController.createRole )
.get( RolesController.getRoles )

router
.route('/devotion')
.post( DevotionsController.createDevotion )

router
.route('/role/:id')
.delete( RolesController.deleteRole )

router
.route('/testimonyActivate/:id')
.post(testimonyController.testimonyActive); 


 module.exports = router;