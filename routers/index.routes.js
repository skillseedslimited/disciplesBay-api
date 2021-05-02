const { multerUploads } = require("../middleware/multer");
// https://appadmin.coza.org.ng
const {
  authorize,
  verifyToken,
  authorizeUpdated,
} = require("../middleware/authJwt");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
    ); 
 
    next();
  });

  // Users Role Management
  app.use("/api/v1/role", [verifyToken, authorizeUpdated(["can-mgt-role"])], require("./role.routes"));

  app.use("/api/v1/sermon", [verifyToken], require("./sermon.routes"));
  app.use("/api/v1/kids", [verifyToken], require("./kids.routes"));
  app.use("/api/v1/worship", [verifyToken], require("./worship.routes"));
  app.use("/api/v1/userManagement", require("./userManagement.routes"));
  app.use("/api/v1/counsellor", [verifyToken], require("./counsellor.routes"));
  app.use("/api/v1/wallet", [verifyToken], require("./wallet.routes"));
  app.use("/api/v1/webstore", require("./store.web.routes"))
  app.use("/api/v1/store", [verifyToken], require("./store.routes"));
  app.use("/api/v1/payment",  require("./payment.routes"));
  app.use("/api/v1", require("./default.routes"));
  app.use("/api/v1/devotion", [verifyToken], require("./devotion.routes"));
  app.use("/api/v1/news", require("./news.routes"));
  app.use("/api/v1/profile", [verifyToken], require("./profile.routes"));
  app.use("/api/v1/role", [verifyToken], require("./role.routes"));
  app.use("/api/v1/testimony", [verifyToken], require("./testimony.routes"));
  app.use("/api/v1/event", [verifyToken], require("./event.routes"));
  app.use("/api/v1/gallery", [verifyToken], require("./gallery.routers"));
  app.use("/api/v1/branch", [verifyToken], require("./branch.routes"));
  app.use("/api/v1/stream", [verifyToken],  require("./restream.routes"));
  app.use("/api/v1/department", [verifyToken],  require("./department.routes"));
  app.use("/api/v1/feedback", [verifyToken],  require("./feedback.routes"));
  app.use("/api/v1/webstore", require("./store.web.routes"))

  app.use("/api/v1/flutterwave", [verifyToken], require("./flutterwave.routes"));
  app.use("/api/v1/settings", [verifyToken], require("./settings.routes"));
  app.use("/api/v1/donation", [verifyToken], require("./donation.routes"));
  app.use("/api/v1/notification", [verifyToken], require("./notification.routes"));

  app.use("/api/v1/file", [verifyToken], require("./file.routes"));
  
  app.use("/api/v1/communication", [verifyToken], require("./communication.routes"));

  app.use("/api/v1/mentorship", [verifyToken], require("./mentorship.routes"));

  // Family Processes
  app.use("/api/v1/baby-christianing", [verifyToken], require("./FamilyProcesses/babyChristianing.routes"));
  app.use("/api/v1/business-dedication", [verifyToken], require("./FamilyProcesses/businessDedication.routes"));
  app.use("/api/v1/child-dedication", [verifyToken], require("./FamilyProcesses/childDedication.routes"));
  app.use("/api/v1/house-dedication", [verifyToken], require("./FamilyProcesses/houseDedication.routes"));
  app.use("/api/v1/marital-class", [verifyToken], require("./FamilyProcesses/maritalClasses.routes"));
  app.use("/api/v1/marriage-form", [verifyToken], require("./FamilyProcesses/marriageForm.routes"));
  app.use("/api/v1/relationship-registration", [verifyToken], require("./FamilyProcesses/relationshipReg.routes"));
  app.use("/api/v1/vehicle-dedication", [verifyToken], require("./FamilyProcesses/vehicleDedication.routes"));
  app.use("/api/v1/wedding-dedication", [verifyToken], require("./FamilyProcesses/weddingDedication.routes"));


  // ============================================ APPOINTMENT ROUTES =============================================
  //User Appointments routes
  app.use("/api/v1/user/appointments/", [verifyToken], require("./Appointments/userAppointments.routes"));

  //User Appointments routes
  app.use("/api/v1/admin/appointments/", [verifyToken], require("./Appointments/adminAppointments.routes"));


  // =========================================== CELL ROUTES =====================================================
  // Cell Admin routes
  app.use("/api/v1/admin/cell/", [verifyToken], require("./cell/adminCell.routes"));

  // Cell user routes
  app.use("/api/v1/user/cell/", [verifyToken], require("./cell/userCell.routes"));

  
}; 
