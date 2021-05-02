const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MentorshipSubscriptionSchema = new Schema(
    {
        category_id : {
            type : Schema.Types.ObjectId,
            ref : "MentorshipCategory"
        },
        level_id : {
            type : Schema.Types.ObjectId,
            ref : "MentorshipLevel"
        },
        package_name : {
            type : String,
            required : true
        },
        amount : {
            type: Number,
            default : 0
        },
        frequency : {
            type : Number,
            default : 0
        },
        capacity : {
            type : Number,
            default : 0
        },
        total_number_of_users : {
            type : Number,
            default : 0
        },
        isDeleted : {
            type : Boolean,
            default : false
        }
    },{ timestamps : true}
)

module.exports = MentorshipSubscription = mongoose.model("mentorship_subscription",MentorshipSubscriptionSchema);