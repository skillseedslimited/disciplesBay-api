const MentorshipAction = require("../Actions/MentorshipActions");
module.exports = {
    createMentorshipCategory :  async function(req,res)
    {
        return MentorshipAction.createMentorshipCategory(req,res);
    },
    updateMentorshipCategory :  async function(req,res)
    {
        return MentorshipAction.updateMentorshipCategory(req,res);
    },
    fetchAllMentorshipCategories :  async function(req,res)
    {
        return MentorshipAction.fetchAllMentorshipCategories(req,res);
    },
    deleteMentorshipCategories :  async function(req,res)
    {
        return MentorshipAction.deleteMentorshipCategories(req,res);
    },
    fetchSingleMentorshipCategory : async function(req,res)
    {
        return MentorshipAction.fetchSingleMentorshipCategory(req,res);
    },
    createMentorshipLevel : async function(req,res)
    {
        return MentorshipAction.createMentorshipLevel(req,res);
    },
    updateMentorshipLevel : async function(req,res)
    {
        return MentorshipAction.updateMentorshipLevel(req,res);
    },
    fetchSinglelevel :async function(req,res)
    {
        return MentorshipAction.fetchSinglelevel(req,res);
    },
    fetchAllMentorshipLevel : async function(req,res)
    {
        return MentorshipAction.fetchAllMentorshipLevel(req,res);
    },
    deleteMentorshipLevel : async function(req,res)
    {
        return MentorshipAction.deleteMentorshipLevel(req,res);
    },
    createMentorshipSubscription : async function(req,res)
    {
        return MentorshipAction.createMentorshipSubscription(req,res);
    },
    updateMentorshipSubscription : async function(req,res)
    {
        return MentorshipAction.updateMentorshipSubscription(req,res);
    },
    findSinglementorshipSubscription : async function(req,res)
    {
        return MentorshipAction.findSinglementorshipSubscription(req,res);
    },
    deleteMentorshipSubscription : async function(req,res)
    {
        return MentorshipAction.deleteMentorshipSubscription(req,res);
    },
    fetchAllLevelMentorshipSubscription : async function(req,res)
    {
        return MentorshipAction.fetchAllLevelMentorshipSubscription(req,res);
    },
    subscribeUserPackage : async function(req,res)
    {
        return MentorshipAction.subscribeUserPackage(req,res);
    },
    fetchUserSubscriptions :async function(req,res)
    {
        return MentorshipAction.fetchUserSubscriptions(req,res);
    }

}