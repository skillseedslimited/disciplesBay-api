const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create schema
const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    username:{
        type: String
    },
    phoneNumber: {
        type: String
    },
    status: {
        type: Boolean
    },
    address: [
        {
            city: {
                type: String
            },
            state: {
                type: String
            },
            country: {
                type: String
            }
        }
    ],
    department: {
        type: String
    },
    profilePicture: {
        type: String
    },
    maritalStatus: {
        type: String
    },
    sex: {
        type: String
    },
    occupation: {
        type: String
    },
    familyMembers: [
        {
            name:{
                type: String
            },
            connection:{
                type: String
            }
        }
    ]
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
 