module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      
      next();
    });
      app.use('/api/v1/default', require('./defaultRoute'));
      app.use('/api/v1/admin', require('./adminRoute'));
      app.use('/api/v1/user', require('./userRoute'));
  };
  