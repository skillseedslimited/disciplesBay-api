const CommunicationSetting = require("../models/CommunicationSetting");
const User = require("../models/User");
const Wallet = require("../models/Wallet");
const CallLog = require("../models/CallLogs");
const moment = require("moment");
const NotificationAction = require("../Actions/NotificationActions");
module.exports = {
    fetchCommuncationSettings : async function(req,res)
    {
        try {
            var communication_settings = await CommunicationSetting.find({}).exec();
            return res.status(200).json({success : true,message : "Communication settings fetched successfully",communication_settings : communication_settings});
        } catch (error) {
            return res.status(500).json({
                success : false,
                message : "Unable to fetch communciation settings",
                error
            })
        }
    },
    updateCommunicationSettings : async function(req,res)
    {
        try {
            const setting = req.params.settings;
            var check = await CommunicationSetting.findById(setting).exec();
            if(!check)
            {
                return res.status(404).json({success :false,message :"Settings not found"})
            }
            const {amount} = req.body;
            var communication_settings = await CommunicationSetting.findByIdAndUpdate(setting,{amount},{new : true}).exec();
            return res.status(200).json({success : true,message : "Communication settings updated successfully",communication_settings : communication_settings});
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                success : false,
                message : "Unable to update communciation settings",
                error
            })
        }
    },
    //initiate call
    initiateCall : async function(req,res)
    {
        //get the receiver username or id, and also the generated channel name
        const { receiver,channel_name,call_type} = req.body;
        //check receiver exists
        if(receiver.length == 0 || channel_name.length == 0 || call_type.length == 0)
        {
            return res.status(400).json({success : false,message : "Compulsory fields arent sent"});

        }
        var check_receiver_exists = await User.findById(receiver).exec();
        if(!check_receiver_exists)
        {
            return res.status(404).json({success : false,message : "Receiver not found"});
        }
        //get receiver user 
        var receiver_user = check_receiver_exists;
        //check receiver is a counsellor
        // --> to be done here
        //check this user balance can initiate a call atall
        var sender = req.user;
        var user_has_enough = await this.checkUserHaveEnoughToCall(sender,call_type);

        if(user_has_enough)
        {
            //calculate number of minutes is wallet balance can take
            var number_of_secs = await  this.calculateNumberOfMinutesforWalletBalance(sender,call_type);
            // console.log(number_of_secs);
            //check receivr can receive call now
            if(! await this.checkReceiverIsOnCall(receiver))
            {   
                //send receiver a ring notification and channel name
              var logId =      await  this.sendRingNotification(
                sender,receiver_user,channel_name,call_type);
                
                return res.status(200).json({success : true,message : "Call initiated successfully",estimated_call_time : number_of_secs, time_unit : "seconds",logId});

            }else{
                //return a response that caller is busy
                return res.status(400).json({success : false,message : "Receiver is on another call"});
            }
        }else
        {
            return res.status(400).json({success : false,message : "Not enough balance to initiate call"});
        }



    },
    checkUserHaveEnoughToCall : async function (sender,call_type) {

        var user_wallet = await Wallet.findOne({user : sender._id}).exec();
       
        var the_call_type = await CommunicationSetting.findOne({communication_type : call_type}).exec();
        
        if(user_wallet && the_call_type)
        {
           //check  wallet has enough for call type
             return user_wallet.balance > the_call_type.amount;
        }
        return false;
    },
    calculateNumberOfMinutesforWalletBalance : async function(sender,the_call_type){
        var user_wallet = await Wallet.findOne({user : sender._id}).exec();
        var call_type = await CommunicationSetting.findOne({communication_type : the_call_type}).exec();

        if(call_type.amount == 0 )
        {
            return 2000;
        }else{
            var number_of_secs = (user_wallet.balance / call_type.amount);
            return number_of_secs;
        }   

    },
    checkReceiverIsOnCall : async function(receiver){
        //check this receiver his busy or it more than is last call
        const call_log = await CallLog.findOne({receiver : receiver}).sort({ createdAt : -1}).exec();

        if(call_log)
        {
            //check now is greater than estimated time 
            var current_time = moment(Date.now());
            var last_call_est = moment(call_log.ring_time);
            var duration = moment.duration(current_time.diff(last_call_est));
            var minutes = duration.asMinutes();
            if((minutes >= 0) && (call_log.status == "active" || call_log.status == "end" ))
            {
                return false;
            }else{
                return true;
            }
        }else{
           
            return false;
        }
    },

    sendRingNotification : async function(sender,receiver,channel_name,call_type)
    {

        const call_log = new CallLog({sender:sender._id,receiver : receiver._id,channel_name,ring_time :moment(Date.now()).add(30,"seconds"),status : "ring",time_ended : moment(Date.now()).add(30,"seconds"),call_type});

        await call_log.save();

        return call_log._id;
        // NotificationAction.sendCommunication(receiver,"New Incoming Call","ring",channel_name,call_type,sender,call_log._id);

       
    },

    receiveCall : async function(req,res) 
    {
        const {channel_name,receiver,log_id} = req.body;

        const log = await CallLog.findOne({ _id : log_id,time_ended : {$lte : moment(Date.now())}}).exec();

        if(log)
        {
            console.log(log_id)
           await CallLog.findOneAndUpdate({_id : log_id},{status : "busy",call_start_time : moment.now()}).exec();
            const notification_receiver = await User.findById(log.sender).exec();
            const notification_sender = await User.findById(log.receiver).exec();
        //send notification and return call connected successfully
            // NotificationAction.sendCommunication(notification_receiver,"Call connected","connected",channel_name,log.call_type,notification_sender,log._id);

            return res.status(200).json({success : true,message : "Call connected successfully"});
        }else {
            await CallLog.findOneAndUpdate({_id : log_id},{status : "ended"}).exec();

            return res.status(400).json({success : false,message : "Unable to connect call"});
            //call ended
        }

    },
    //call end
    callEnd : async function(req,res) 
    {
        const {time_call_end,log_id} = req.body;

        const log = await CallLog.findOne({ _id : log_id}).exec();

        if(log)
        {
            //estimate sender wallet balance on call
              await CallLog.findOneAndUpdate({_id : log_id},{status : "end"}).exec();
              //calculate balance and enter estimated time_end

            const sender = await User.findById(log.sender).exec();
            const receiver = await User.findById(log.receiver).exec();

            const callTime = moment(time_call_end);
            //update sender wallet balance based on time on this log
            let charge = await this.chargeCallOffWallet(sender,callTime,log);
            var user_wallet = await Wallet.findOne({user : sender._id}).exec();
            if(user_wallet)
            {
                await Wallet.findByIdAndUpdate(user_wallet._id,{balance : user_wallet.balance - charge,amount_used :charge }).exec();
            }
            //send notification and return call connected successfully
            // NotificationAction.sendCommunication(sender,"Call ended","ended",log.channel_name,log.call_type,sender,log._id);

            // NotificationAction.sendCommunication(receiver,"Call ended","ended",log.channel_name,log.call_type,sender,log._id);

            return res.status(200).json({success : true,message : "Call ended successfully"});
        }else {
            await CallLog.findOneAndUpdate({_id : log_id},{status : "ended"}).exec();

            return res.status(400).json({success : false,message : "Unable to end call"});
            //call ended
        }

    },

  chargeCallOffWallet : async function(sender,callTime,callLog)
  {
     let call_start_time = moment(callLog.call_start_time).subtract(1,"hour");
    console.log(callTime);
    console.log(call_start_time);
     var duration = moment.duration(callTime.diff(call_start_time));
     var seconds = duration.asSeconds();
    console.log("call start time " + call_start_time + " call tie " + callTime + " durtion "+ seconds);
     if(seconds <= 0)
     {
         //update wallet to zero
         var user_wallet = await Wallet.findOne({user : sender._id}).exec();
         return user_wallet.balance;
     }else{
         //calculate what left of balance after this call
         var call_type = await CommunicationSetting.findOne({communication_type : callLog.call_type}).exec();
 
         if(call_type.amount == 0 )
         {
            return 0;
         }else{

             var amount_used = (seconds * call_type.amount);
             console.log(amount_used);
             console.log(seconds);
             return amount_used;
         }   
     }

     
  }

    
}