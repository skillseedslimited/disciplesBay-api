const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const UserSchema = new Schema({
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
    confirmPassword: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"]
      },
    date: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: false
    },
    secretToken: String,
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

module.exports = User = mongoose.model('users', UserSchema);
 