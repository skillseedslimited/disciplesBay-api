const Role = require("../models/Role");
const Permission = require("../models/Permission");
const RoleAndPermission = require("../models/RoleAndPermission");
const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/errorResponse.js");
const User = require("../models/User");

const createRole = asyncHandler(async (req, res, next) => {
  try {
    const { name, menu_structure, permissions } = req.body;

    var role = Role({ name, menu_structure });
    await role.save();
    if (!role) {
      return res.status(400).json({
        success: false,
        message: "unable to create role, please check the data and try again",
      });
    }
    //get permissions
    for (permission of permissions) {
      var perm = await Permission.findOne({
        name: permission,
      });
      // console.log(perm);
      if (perm) {
        await RoleAndPermission.findOneAndUpdate(
          {
            permission: perm._id,
            role: role._id,
          },
          {
            permission: perm._id,
            role: role._id,
            permission_name: perm.name,
          },
          { upsert: true, setDefaultsOnInsert: true },
          function(error, doc) {
            if (!error) {
            } else {
              console.log(error);
            }
          }
        );
      }
    }
    return res.status(200).json({
      success: true,
      message: "Role created Successfully",
      data: role,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Unable to create", error });
  }
});

const getRoles = asyncHandler(async (req, res, next) => {
  const role = await Role.find().sort({ createAt: "desc" });

  if (!role) {
    return res.status(200).json({
      success: true,
      message: "No roles have been created",
      data: {},
    });
  }

  return res.status(200).json({
    success: true,
    message: "Roles Found",
    data: role,
  });
});
const getPermissions = asyncHandler(async (req, res, next) => {
  const permissions = await Permission.find().sort({ createAt: "desc" });

  if (!permissions) {
    return res.status(200).json({
      success: true,
      message: "No permissions have been created",
      data: {},
    });
  }

  return res.status(200).json({
    success: true,
    message: "Permissions Found",
    data: permissions,
  });
});
const deleteRole = asyncHandler(async (req, res, next) => {
  //check if role exists
  const role = await Role.findById(req.params.id);
  if (!role) {
    return next(
      new ErrorResponse(`No role with the id of ${req.params.id}`, 404)
    );
  }
  //check if role has been assigned to users
  const users = await User.find({ role: req.params.id });
  if (users[0]) {
    return next(
      new ErrorResponse("Unable to delete: Role has users assigned to it", 403)
    );
  }

  await role.remove();

  res.status(200).json({
    success: true,
    message: "Role deleted successfully",
    data: {},
  });
});

const getSingleRole = async function(req, res) {
  try {
    const role_id = req.params.role;
    const role = await Role.findById(role_id)
      .lean()
      .exec();
    if (!role) {
      return res
        .status(400)
        .json({ success: false, message: "Role not found" });
    }

    //fetch all the thing needed by the role
    const permissions_ids_object = await RoleAndPermission.find({
      role: role_id,
    })
      .select("permission")
      .exec();
    const permission_ids = permissions_ids_object.map((perm) => {
      return perm.permission.toString();
    });

    const permissions = await Permission.find({
      _id: { $in: permission_ids },
    }).exec();

    role["permissions"] = permissions;
    console.log(role);
    return res.status(200).json({
      success: true,
      message: "Role fetched successfully",
      data: role,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to fetch role ",
      data: error,
    });
  }
};

const updateRole = async function(req, res) {
  const role_id = req.params.role;
  try {
    const role = await Role.findById(role_id)
      .lean()
      .exec();
    if (!role) {
      return res
        .status(400)
        .json({ success: false, message: "Role not found" });
    }
    const { name, menu_structure, permissions } = req.body;
    //update role
    var updated_role = await Role.findByIdAndUpdate(
      role._id,
      { name, menu_structure },
      { new: true }
    ).exec();

    if (!updated_role) {
      return res.status(400).json({
        success: false,
        message: "Unable to update role, please try again",
      });
    }
    //   resync role permissions
    var deleted = await RoleAndPermission.deleteMany({ role: role._id }).exec();
    if (deleted) {
      for (permission of permissions) {
        var perm = await Permission.findOne({
          name: permission,
        });
        // console.log(perm);
        if (perm) {
          await RoleAndPermission.findOneAndUpdate(
            {
              permission: perm._id,
              role: role._id,
            },
            {
              permission: perm._id,
              role: role._id,
              permission_name: perm.name,
            },
            { upsert: true, setDefaultsOnInsert: true },
            function(error, doc) {
              if (!error) {
              } else {
                console.log(error);
              }
            }
          );
        }
      }
      return res.status(200).json({
        success: true,
        message: "Role updated successfully",
        data: role,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Unable to resync role permissions" });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update role ",
      data: error,
    });
  }
};

module.exports = {
  createRole,
  getRoles,
  deleteRole,
  getSingleRole,
  updateRole,
  getPermissions,
};
