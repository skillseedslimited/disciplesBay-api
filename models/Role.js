const mongoose = require("mongoose");
const moment = require("moment");
const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  menu_structure: {
    type: JSON,
    default: null,
  },
  createdAt: {
    type: Date,
    default: moment().format(),
  },
});

// check role has permission
// RoleSchema.methods.toJSONAsync = async function (permission) {
//     var role = this;
//     var lesson_count = await Role.find({ course: course._id })
//       .countDocuments()
//       .exec();
//     course.lesson_count = lesson_count;
//     course.details = details;
//     return _.pick(course, [
//       "_id",
//       "title",
//       "schedule",
//       "cover_image",
//       "lesson_count",
//       "details",
//     ]);
//   };

module.exports = mongoose.model("Role", RoleSchema);
