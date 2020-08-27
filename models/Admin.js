const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const AdminSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    picture: {
        type: String,
        default:'',
    },
    phoneNumber: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "admin",
        enum: ["user", "admin"]
      },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

module.exports = Admin = mongoose.model('admin', AdminSchema);
 