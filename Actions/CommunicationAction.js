const User = require("../models/User");

const CommunicationSetting = require("../models/CommunicationSetting");
const Wallet = require("../models/Wallet");
const CallLog = require("../models/CallLogs");
const moment = require("moment");
const CounsellorRequest = require("../models/CounsellorRequest");
const NotificationAction = require("../Actions/NotificationActions");
const ChatList = require("../models/ChatList");
const ChatMessages = require("../models/ChatMessages");
const { populate } = require("../models/User");

// const { Mongoose } = require("mongoose");
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
        try{
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

        //check user alrady send request to same person
 
        //get receiver user 
        var receiver_user = check_receiver_exists;
        let checkPendingRequest = await CounsellorRequest.findOne({sender : req.user._id,counsellor : receiver_user._id}).sort({createdAt : -1}).exec();
        
        if(!checkPendingRequest)
        { 
             return res.status(400).json({success : false,message : "You need to send a request before placing "+call_type});

        }

        let expire_in = new Date(checkPendingRequest.expires_in).getTime();
        let today = new Date.getTime();
        let expired = expire_in < today;

        if(expired){
            await checkPendingRequest.update({status:"expired"})
        }

        if(checkPendingRequest.status == "pending" && !expired)
        {
            //return message that u can place request again
            return res.status(400).json({success : false,message : "Counsellor has not accepted a request from you"});
        }else{
            if(checkPendingRequest.used || checkPendingRequest.status == "expired")
            {
                //u can make call again as well
                return res.status(400).json({success : false,message : "Please resend a request to counsellor"});
            }
        }
        
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

    }catch(error)
    {
        console.log(error)
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        });
    }


    },
    checkUserHaveEnoughToCall : async function (sender,call_type) {
        return true;
        var user_wallet = await Wallet.findOne({user : sender._id}).exec();
       
        var the_call_type = await CommunicationSetting.findOne({communication_type : call_type}).exec();
        // if(user_wallet == null){
        //     console.log('i also')
        //     return true
        // }
        if(user_wallet && the_call_type)
        {
        
           //check  wallet has enough for call type
             return user_wallet.balance == the_call_type.amount;
        }
        
        return false;
    },
    calculateNumberOfMinutesforWalletBalance : async function(sender,the_call_type){
        return 10000000000000;
        var user_wallet = await Wallet.findOne({user : sender._id}).exec();
        var call_type = await CommunicationSetting.findOne({communication_type : the_call_type}).exec();

        if(call_type.amount == 0 )
        {
            return 10000000000000;
        }else{
            var number_of_secs = (user_wallet.balance / call_type.amount);
            return number_of_secs;
        }   

    },
    checkReceiverIsOnCall : async function(receiver){
        //check this receiver his busy or it more than is last call
        return false;
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

        try{
        console.log(call_type)
        const call_log = new CallLog({sender:sender._id,receiver : receiver._id,channel_name,ring_time :moment(Date.now()).add(30,"seconds"),status : "ring",time_ended : moment(Date.now()).add(30,"seconds"),call_type});

        await call_log.save();

        NotificationAction.sendCommunication(receiver,"New Incoming Call","ring",channel_name,call_type,sender,call_log._id);  
         
        return call_log._id;
      }
        catch(error)
       {
        console.log(error)
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        });
     }

       
    },

    receiveCall : async function(req,res) 
    {
        try{
        const {channel_name,receiver,log_id} = req.body;

        const log = await CallLog.findOne({ _id : log_id,time_ended : {$lte : moment(Date.now())}}).exec();

        if(log)
        {
           
           await CallLog.findOneAndUpdate({_id : log_id},{status : "busy",call_start_time : moment.now()}).exec();
            const notification_receiver = await User.findById(log.sender).exec();
            const notification_sender = await User.findById(log.receiver).exec();

            let checkPendingRequest = await CounsellorRequest.findOne({sender : log.sender,counsellor :  log.receiver}).sort({createdAt : -1}).exec();

            if(checkPendingRequest)
            {
                await CounsellorRequest.findByIdAndUpdate(checkPendingRequest._id,{
                    used : true
                }).exec();
            }
        //send notification and return call connected successfully
            NotificationAction.sendCommunication(notification_receiver,"Call connected","connected",channel_name,log.call_type,notification_sender,log._id);

            return res.status(200).json({success : true,message : "Call connected successfully"});
        }else {
            await CallLog.findOneAndUpdate({_id : log_id},{status : "ended"}).exec();

            return res.status(400).json({success : false,message : "Unable to connect call"});
            //call ended
        }
    }
        catch(error)
        {
            console.log(error)
            return res.status(500).json({
                success : false,
                message : "Internal server error"
            });
        }
    },
    //call end
    callEnd : async function(req,res) 
    {

        try{
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
            // let charge = await this.chargeCallOffWallet(sender,callTime,log);
            // var user_wallet = await Wallet.findOne({user : sender._id}).exec();
            // if(user_wallet)
            // {
            //     await Wallet.findByIdAndUpdate(user_wallet._id,{balance : user_wallet.balance - charge,amount_used :charge }).exec();
            // }
            //send notification and return call connected successfully
            NotificationAction.sendCommunication(sender,"Call ended","ended",log.channel_name,log.call_type,sender,log._id);

            NotificationAction.sendCommunication(receiver,"Call ended","ended",log.channel_name,log.call_type,sender,log._id);

            return res.status(200).json({success : true,message : "Call ended successfully"});
        }else {
            await CallLog.findOneAndUpdate({_id : log_id},{status : "ended"}).exec();

            return res.status(400).json({success : false,message : "Unable to end call"});
            //call ended
        }

     } catch(error)
    {
        console.log(error)
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        });
    }

    },

  chargeCallOffWallet : async function(sender,callTime,callLog)
  {

    try{
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
     catch(error)
     {
         console.log(error)
         return res.status(500).json({
             success : false,
             message : "Internal server error"
         });
     }
     
  },
//request counsellor
requestCounsellor : async function(req,res)
{
    try
    {
        const {counsellor_id, call_type} = req.body;
    
        let counsellor = await User.findOne({_id : counsellor_id}).populate("role").exec();
    
          if(!counsellor)
          {
              return res.status(404).json({
                  success  :false,
                  message : "Can not find user counsellor"
              })
          }

          if(counsellor.role)
          {
              if(counsellor.role.name != "counsellor")
              {
                return res.status(400).json({
                    success  :false,
                    message : "User is not a counsellor"
                })
              }
          }else{
                return res.status(400).json({
                    success  :false,
                    message : "User is not a counsellor"
                })
          }
     //check maybe he has a pending request
          let checkPendingRequest = await CounsellorRequest.findOne({sender : req.user._id,counsellor : counsellor._id}).sort({createdAt : -1}).exec();
    
          if(checkPendingRequest)
          {
            let expire_in = new Date(checkPendingRequest.expires_in).getTime();
            let today = new Date.getTime();
            let expired = expire_in < today;
              //check if expired
              if(expired)
              {
                  await checkPendingRequest.update({status: "expired"});
              }
              //check if pending
              if(checkPendingRequest.status == "pending" && !expired)
              {
                  return res.status(400).json({
                      success : false,
                      message : "You have pending request, please wait till counsellor act on it. thanks"
                  })
              }



          }
          //expires in 2 hours
          let expires_in = moment().add(2, 'hours').format('YYYY-MM-DD hh:mm:ss');
          
          let counsellor_request =  CounsellorRequest({
              sender : req.user._id,
              counsellor : counsellor._id,
              call_type,
              status : "pending",
              expires_in
          })
    
          await counsellor_request.save();
          //snd notification to councillor
          NotificationAction.sendToUser(counsellor,"Call request","request","no link");
    
          return res.status(200).json({
              success : true,
              message : "Request sent successfully to counsellor"
          })
    
        
    }catch(error)
    {
        console.log(error)
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        });
    }
  

},
//counsellor see requests
 getAllRequest : async function(req,res)
 {
     //paginate this later
     try
     { 

     const counsellor_requests = await CounsellorRequest.find({$or : [{sender : req.user._id},{counsellor : req.user._id}],used : 0}).populate({path:'counsellor', select: ['username', 'profilePicture']}).populate({path:'sender', select: ['username', 'profilePicture']}).sort(
         {createdAt : -1}
     ).exec();
     return res.status(200).json({
         success : true,message : "All counsellor request fetched successfully",
         counsellor_requests
     })
    }catch(error)
    {
        console.log(error)
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        });
    }
 },
//counsellor accept requests
manageRequest : async function(req,res)
{
    //paginate this later
    try
    { 
        const counsellor_request_id = req.params.counsellor_request;
        const counsellor_requests = await CounsellorRequest.findById(counsellor_request_id).exec();
        // let sender = counsellor_requests.sender;
        // console.log("this is the sender", sender)
        if(!counsellor_requests)
        {
            return res.status(404).json({
                success : false,
                message : "resource not found"
            });
        }
        let statuses = ["accepted","rejected","expired"];
        const status = req.body.status;
    
        if(statuses.includes(status))
        {
            await CounsellorRequest.findByIdAndUpdate(counsellor_request_id,{
                status
            }).exec();
    
            if(status == "rejected" || status == "expired")
            {
                await CounsellorRequest.findByIdAndDelete(counsellor_request_id).exec();
            }
            // NotificationAction.sendToUser(sender,"Call Request accepted","request","no link");
            return res.status(200).json({
                success : true,message : "Request updated succesfully"
            })
        }
        return res.status(400).json({
            success : false,
            message : "Not a valid status"
        });

    }catch(error)
    {
        console.log(error)
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        });
    }
   
   
},

    async fetchUserChatLst(req,res)
    {
        try{
            const page = req.query.page ? req.query.page : 1;
            const chatList = await ChatList.find({$or : [
                {sender : req.user._id}, {receiver : req.user._id}
            ]}).populate({ path: 'sender', model: User }).populate({ path: 'receiver', model: User }).skip(( page - 1) * 20).limit(20).exec()
    
            //process chatllist
            let chatLists = [];
            let individualChat = {};
            let chat_actor = {}
        
            for(let chat of chatList)
            {
                chat_actor  = await ChatMessages.find({
                                     chat_id : chat._id
                   }).populate({ path: 'sender', model: User }).populate({ path: 'receiver', model: User }).sort({"createdAt" :  -1}).limit(1).exec()
                   if(chat_actor.length <= 0 )
                   {
                     continue;
                   }
                   
                 individualChat = {
                     _id : chat._id,
                    user : req.user._id == chat.sender ? chat.sender.username : chat.receiver.username,
                    last_message : chat_actor[0].sender == chat.sender ? {
                            user : chat_actor[0].sender.username,
                            message : chat_actor[0].message,
                            createdAt : chat.createdAt
                    } : {
                        user : chat_actor[0].receiver.username,
                        message : chat_actor[0].message,
                        createdAt : chat.createdAt
                     } ,
                    unread_messages : await ChatMessages.findOne({
                        chat_id : chat._id,read : false
                    }).countDocuments().exec()
                }
    
                chatLists.push(individualChat);
            }
            //process pagination
            const total_chatlist = await ChatList.find({$or : [
                {sender : req.user._id}, {receiver : req.user._id}
            ]}).countDocuments().exec();
            let pagination  = {}
            if(total_chatlist.length > 0)
            {
                pagination = {
                    total_chatlist :total_chatlist,
                    total_pages : Math.ceil(total_chatlist / 20),
                    current_page : parseInt(page)
                }
            }else{
                pagination = {
                    total_chatlist : 0,
                    total_pages : 0,
                    current_page : 0,
                }
            }
    
            return res.status(200).json({
                success : true,
                chat_list :  chatLists,
                // pagination
            })
        }catch(error) 
        {
            console.log(error)
            return res.status(500).json({
                success : false,
                message : "An error occured"
            })
        }
       

    },
    async fetchChatMessages(req,res)
    {
        try
        {
            const chat_id = req.params.chat;
            const page = req.query.page ? req.query.page : 1;
            //check the user s either the sender or thre redceiver the chat
            let isCheck = await ChatList.exists({
                $or : [
                    {sender : req.user._id,_id :chat_id }, {receiver : req.user._id,id :chat_id}
                ]
            })
    
            if(!isCheck)
            {
                return res.status(400).json({
                    success : false,
                    message : "User dont have access to chat"
                })
            }
            //get chat messages
            let chat_messages  = await ChatMessages.find({
                chat_id : chat_id
            }).populate({ path: 'sender', model: User }).populate({ path: 'receiver', model: User }).exec()
    
            let all_messages = [];
            let individualChat = {};
            for(let chat of chat_messages)
            {
                individualChat = {
                    message : chat.message,
                    is_sender: chat.sender._id == req.user._id,
                    sender : chat.sender.username,
                    receiver : chat.sender.receiver,
                    createdAt : chat.createdAt,
                }
    
                all_messages.push(individualChat)
            }
    
            //process pagination
            const total_chatmessages =  await ChatMessages.find({
                chat_id : chat_id
            }).countDocuments().exec();
            let pagination  = {}
            if(total_chatmessages.length > 0)
            {
                pagination = {
                    total_chatmessages :total_chatmessages,
                    total_pages : Math.ceil(total_chatmessages / 20),
                    current_page : parseInt(page)
                }
            }else{
                pagination = {
                    total_chatmessages : 0,
                    total_pages : 0,
                    current_page : 0,
                }
            }
    
            return res.status(200).json({
                success : true,
                all_messages :  all_messages,
                pagination
            })
        }catch(error)
        {
            console.log(error)
            return res.status(500).json({
                success : false,
               message : "An error has occured"
            })

        }
      

    }
    ,
    async sendChatMessage(req,res)
    {
        //check there is a realtionship between sender and reiver
        try{

            const {receiver,message} = req.body

            if(!("receiver") in req.body)
            {
                return res.status(400).json({
                    success : false,
                    message : "Receiver is a compulsory field"
                })
            }
            if(!("message") in req.body)
            {
                return res.status(400).json({
                    success : false,
                    message : "message is a compulsory field"
                })
            }
            var ObjectId = require('mongoose').Types.ObjectId;
            if(! ObjectId.isValid(receiver))
            {
                return res.status(400).json({
                    success : false,
                    message : "Receiver is not a valid user"
                })
            }
            let receiver_user = User.findOne({_id : receiver}).exec();
    
            if(!receiver_user)
            {
                return res.status(400).json({
                    success : false,
                    message : "Receiver user does not exist"
                })
            }
            let chatList = await ChatList.findOne({
                        sender : req.user._id,receiver : receiver}).exec()
        
            if(!chatList)
            {
    
                  chatList = await ChatList.findOne({
                    sender : receiver,receiver : req.user._id}).exec()
    
                    if(!chatList)
                    {
                        chatList  = new ChatList({
                            sender : req.user._id,
                            receiver : receiver
                        })
                        await chatList.save();
                    }
              
            }
    
           let chatMessage =   ChatMessages({
                chat_id : chatList._id,
                sender : req.user._id,
                receiver : receiver,
                message ,
                read : false
            })
            await chatMessage.save();
            //send a notification and the message real time
           let sender = await User.findOne({_id : req.user._id}).exec();
            NotificationAction.sendChat(receiver_user,message,"chat",sender)
    
            return res.status(200).json({
                success : true,
                message : "Chat sent succesfully",
                message : chatMessage
            })
        }catch(error)
        {
            console.log(error)
            return res.status(500).json({
                success : false,
                message : "Internal server error"
            });
        }
       
    }
}