const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  campus:{
    type: String
  },

  stream_key:{
    type: String
  },

  fullName:{
    type:String
  },

  phoneNumber: {
    type: String,
  },

  password: {
    type: String,
    required: true,
  },

  confirmPassword: {
    type: String,
    required: false,
  },

  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },

  cell: {
    type: Schema.Types.ObjectId,
    ref: "cell"
  },

  cell_leader: {
    type: Boolean,
    default: false
  },

  date: {
    type: Date,
    default: Date.now,
  },

  active: {
    type: Boolean,
    default: false,
  },

  address: [
    {
      city: {
        type: String,
        default: null,
      },
      state: {
        type: String,
        default: null,
      },
      country: {
        type: String,
        default: null,
      },
    },
  ],

  department: {
    type: String,
    default: null,
  },

  profilePicture: {
    type: String,
    default: null,
  },

  maritalStatus: {
    type: String,
    default: null,
  },

  sex: {
    type: String,
    default: null,
  },

  occupation: {
    type: String,
    default: null,
  },

  familyMembers: [
    {
      name: {
        type: String,
        default: null,
      },
      connection: {
        type: String,
        default: null,
      },
    },
  ],

  notificationCounter: {
    type: Number,
    default: 0,
  },

  deviceToken: {
    type: String,
    default: null,
  },

  deviceRegistered: {
    type: Boolean,
    default: false,
  },

  active: {
    type: Boolean,
    default: false,
  },

  counselorCat:{
    type:String
  },

  description:{
    type: String
  },
  isOnline:{
    type:Boolean,
    default: true
  },
  secretToken: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

module.exports = User = mongoose.model("users", UserSchema);
