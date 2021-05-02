const CommunicationAction = require("../Actions/CommunicationAction");

module.exports = {
    fetchCommuncationSettings : async function(req,res)
    {
        return CommunicationAction.fetchCommuncationSettings(req,res);
    },
    updateCommunicationSettings : async function(req,res)
    {
        return CommunicationAction.updateCommunicationSettings(req,res);
    },
    
    initiateCall : async function(req,res)
    {
        return CommunicationAction.initiateCall(req,res);
    },
    receiveCall : async function(req,res)
    {
        return CommunicationAction.receiveCall(req,res);
    },
    callEnd : async function(req,res)
    {
        return CommunicationAction.callEnd(req,res);
    },
    requestCounsellor : async function(req,res)
    {
        return CommunicationAction.requestCounsellor(req,res);
    },

    getAllRequest : async function(req,res)
    {
        return CommunicationAction.getAllRequest(req,res);
    },

    getAllRequestByParameter : async function(req,res)
    {
        return CommunicationAction.getAllRequestByParameter(req,res);
    },

    manageRequest : async function(req,res)
    {
        return CommunicationAction.manageRequest(req,res);
    },

    fetchUserChatLst : async function(req,res) {
            return CommunicationAction.fetchUserChatLst(req,res);
    },
    fetchChatMessages : async function(req,res) {
        return CommunicationAction.fetchChatMessages(req,res);
    },
    sendChatMessage : async function(req,res) {
        return CommunicationAction.sendChatMessage(req,res);
    }  

}