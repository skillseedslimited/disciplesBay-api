const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email'
        ]
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
        type: mongoose.Schema.ObjectId,
        ref: "Role",
        required: true
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
 