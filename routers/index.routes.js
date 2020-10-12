const { multerUploads } = require("../middleware/multer");
const {
  authorize,
  verifyToken,
  authorizeUpdated,
} = require("../middleware/authJwt");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );

    next();
  });

  app.use(
    "/api/v1/role",
    [verifyToken, authorizeUpdated(["can-mgt-role"])],
    require("./role.routes")
  );
  app.use("/api/v1/sermon", [verifyToken], require("./sermon.routes"));
  app.use("/api/v1/userManagement", require("./userManagement.routes"));
  app.use("/api/v1/counsellor", [verifyToken], require("./counsellor.routes"));
  app.use("/api/v1/wallet", [verifyToken], require("./wallet.routes"));
  app.use("/api/v1/store", [verifyToken], require("./store.routes"));
  app.use("/api/v1/payment", [verifyToken], require("./payment.routes"));
  app.use("/api/v1", require("./default.routes"));
  app.use("/api/v1/devotion", [verifyToken], require("./devotion.routes"));
  app.use("/api/v1/news", [verifyToken], require("./news.routes"));
  app.use("/api/v1/profile", [verifyToken], require("./profile.routes"));
  app.use("/api/v1/role", [verifyToken], require("./role.routes"));
  app.use("/api/v1/testimony", [verifyToken], require("./testimony.routes"));
  app.use("/api/v1/event", [verifyToken], require("./event.routes"));
  app.use(
    "/api/v1/flutterwave",
    [verifyToken],
    require("./flutterwave.routes")
  );
  app.use("/api/v1/settings", [verifyToken], require("./settings.routes"));
  app.use("/api/v1/donation", [verifyToken], require("./donation.routes"));
};
