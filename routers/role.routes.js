const express = require("express");
const router = express.Router();
const RolesController = require("../controllers/roles.controller");
const { authorize } = require("../middleware/authJwt");
const rolePolicies = require("../policies/rolePolicies");
router.route("/:id").delete(authorize("admin"), RolesController.deleteRole);

router
  .route("/")
  .post([rolePolicies.validateRole], RolesController.createRole)
  .get(RolesController.getRoles);

router.get("/:role", RolesController.getSingleRole);
router.patch("/:role", [rolePolicies.validateRole], RolesController.updateRole);
router.get("/permissions/list", RolesController.getPermissions);

//permisions
module.exports = router;
