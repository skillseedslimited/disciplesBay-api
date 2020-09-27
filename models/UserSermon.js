const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSermonSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  sermon_id: {
    type: Schema.Types.ObjectId,
    ref: "Sermon",
  },
});

module.exports = UserSermon = mongoose.model("user_sermons", UserSermonSchema);
