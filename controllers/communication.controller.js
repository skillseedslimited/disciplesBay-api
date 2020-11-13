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
    }
}