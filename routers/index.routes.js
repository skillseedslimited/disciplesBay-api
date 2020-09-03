const { multerUploads } = require('../middleware/multer');
const { authorize, verifyToken } = require('../middleware/authJwt');

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      
      next();
    });
      app.use('/api/v1/default', require('./default.routes'));
      app.use('/api/v1/admin', [ verifyToken, authorize('admin') ], require('./admin.routes'));
      app.use('/api/v1/user', [ verifyToken ], require('./user.routes'));
  };
  