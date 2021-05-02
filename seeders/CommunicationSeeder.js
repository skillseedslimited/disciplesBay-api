const CommunicationSetting = require("../models/CommunicationSetting");
const communication_setting = require("../models/CommunicationSetting");

module.exports = {
  up: async function() {
    try {
        var communication_setting_arr = [
            { communication_type : "call",amount : 0},
            { communication_type : "video_call",amount : 0},
            { communication_type : "chat",amount : 0},
        ]

        for ( var setting of communication_setting_arr) {
           
           var comm_setting = await  CommunicationSetting.findOneAndUpdate({communication_type : setting.communication_type },{
            communication_type : setting.communication_type,
            amount : setting.amount
           },
           {
            upsert: true, setDefaultsOnInsert: true
           }, function (error, doc) {
            if (!error) {
            } else {
              console.log(error);
            }
          }
           );
        }
    } catch (error) {
      console.log(error);
    }
  },
};
