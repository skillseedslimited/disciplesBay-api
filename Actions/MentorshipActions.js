const { urlencoded } = require("body-parser");
const MentorshipCategory = require("../models/MentorshipCategory");
const MentorshipLevel = require("../models/MentorshipLevel");
const MentorshipSubscription = require("../models/MentorshipSubscription");
const User = require("../models/User");
const Payment = require("../Actions/PaymentActions");
const UserMentorshipSub = require("../models/UserMentorshipSub");
const moment = require("moment");
module.exports = {

    createMentorshipCategory : async function(req,res)
    {
        const {title,banner} = req.body;
        const mentorship_cat = new MentorshipCategory({title,banner});
        await mentorship_cat.save();

        if(mentorship_cat)
        {
            return res.status(200).json({success : true,message : "mentorship category created successfully"});
        }

        return res.status(500).json({success : false,message : "Unable to create mentorship category"});
    },
    updateMentorshipCategory : async function(req,res)
    {
        const mentorship_cat_id = req.params.mentorship_cat_id;

        const {title,banner} = req.body;
        const check = await MentorshipCategory.findById(mentorship_cat_id).exec();

        if(!check)
        {
            return res.status(404).json({success : false,message : "Mentorship category not found"});
        }
        const mentorship_cat = await MentorshipCategory.findOneAndUpdate({_id : mentorship_cat_id},{title,banner},{new  :true}).exec();

        if(mentorship_cat)
        {
            return res.status(200).json({success : true,message : "mentorship category updated successfully"});
        }

        return res.status(500).json({success : false,message : "Unable to updated mentorship category",mentorship_category :mentorship_cat});
    },
    fetchSingleMentorshipCategory : async function(req,res)
    {
        //do something here
        const mentorship_cat_id = req.params.mentorship_cat_id;

        const mentorship_cat = await MentorshipCategory.findById(mentorship_cat_id).exec();

        if(!mentorship_cat)
        {
            return res.status(404).json({success : false,message : "Mentorship category not found"});
        }

        return res.status(200).json({success : true,message : "Mentorship category fetched successfully",mentorship_cat})
    },
    fetchAllMentorshipCategories : async function(req,res)
    {
        const mentorship_categories = await MentorshipCategory.find({}).sort({createdAt : -1}).exec();
        return res.status(200).json({success :true,message: "Mentorship categories fetched successfully",mentorship_categories : mentorship_categories});
    },
    deleteMentorshipCategories : async function(req,res)
    {
        const mentorship_cat_id = req.params.mentorship_cat_id;
        const mentorship_category = await MentorshipCategory.findById(mentorship_cat_id).exec();

        if(mentorship_category)
        {
            const mentorship_cat = await MentorshipCategory.findOneAndUpdate({_id : mentorship_cat_id},{isDeleted : true},{new  :true}).exec();

            if(mentorship_cat)
            {
                return res.status(200).json({success :true,message: "Mentorship category deleted successfully"});
            }
            return res.status(500).json({success :false,message: "Unable to delete mentorship category"});
        }
        return res.status(404).json({success :false,message: "Mentorship category not found"});
    },
    createMentorshipLevel : async function(req,res)
    {
        const {title,description,mentor} = req.body;
        const mentorship_cat_id = req.params.mentorship_cat_id;
        const mentorship_category = await MentorshipCategory.findById(mentorship_cat_id).exec();

        const check = await User.exists({_id :mentor });

        if(!check)
        {
            return res.status(404).json({success : false,message : "Mentor is not a registered user"});
        }

        if(mentorship_category)
        {
            const mentorship_level = new MentorshipLevel({title,description,category_id : mentorship_category._id});
            await mentorship_level.save();

            if(mentorship_level)
            {
                return res.status(200).json({success : true,message : "level created successfully"});
            }

            return res.status(500).json({success : false,message : "Unable to level"});
        }

        return res.status(404).json({success : false,message : "mentorship category not found"});

    },
    updateMentorshipLevel : async function(req,res)
    {
        const level = req.params.level;
        const mentorship_level = await MentorshipLevel.findById(level).exec();
        const {title, description,category_id,mentor} = req.body;
        const check = await User.exists({_id :mentor });

        if(!check)
        {
            return res.status(404).json({success : false,message : "Mentor is not a registered user"});
        }

        const mentorship_category = await MentorshipCategory.findById(category_id).exec();
        if(!mentorship_category)
        {
            return res.status(404).json({success : false,message : "Unable to find mentorship category"});
        }
        if(!mentorship_level)
        {
           const updated =  await MentorshipLevel.findByIdAndUpdate(level,{title,description,category_id},{new : true}).exec();

           return res.status(200).json({success : true,message : "Mentor level updated successfully",level : updated});
        }
        return res.status(404).json({success : false,message : "Error!, Level not found"});
    },
    fetchAllMentorshipLevel : async function(req,res)
    {
        const mentorship_cat_id = req.params.mentorship_cat_id;
        const mentorship_category = await MentorshipCategory.findById(mentorship_cat_id).exec();

        if(mentorship_category)
        {
            const levels = await MentorshipLevel.find({isDeleted : false,category_id : mentorship_category._id}).populate({
                path : "category_id"
            }).populate({
                path : "mentor"
            }).sort({createdAt :  -1}).exec();

            return res.status(200).json({success : true,message : "Mentor level fetched successfully",levels});
        }else{
            return res.status(404).json({success : false,message : "mentorship category not found"});

        }
    },
    
    fetchSinglelevel : async function(req,res)
    {
        const level = req.params.level;
        const mentorship_level = await MentorshipLevel.findById(level).popuplate('').exec();

        if(!mentorship_level)
        {
            return res.status(404).json({success : false,message : "mentor levelnot found"});
        }

        return res.status(200).json({success : true,message : "single mentor level fetched",mentorship_level : mentorship_level})
        
    },
    deleteMentorshipLevel : async function(req,res)
    {
        const thelevel = req.params.level;
        const level = await MentorshipLevel.findOne({deleted : false,_id : thelevel}).sort({createdAt :  -1}).exec();

        if(level)
        {
            const mentorship_level = await MentorshipLevel.findOneAndUpdate({_id : thelevel},{isDeleted : true},{new  :true}).exec();

            if(mentorship_level)
            {
                return res.status(200).json({success :true,message: "Mentorship level deleted successfully"});
            }
            return res.status(500).json({success :false,message: "Unable to delete mentorship level"});
        }
        return res.status(404).json({success :false,message: "Mentorship level not found"});

    },
    createMentorshipSubscription : async function (req,res) {
            const {category_id,level_id, package_name,amount,frequency,capacity} = req.body;

            const mentorship_category = await MentorshipCategory.findById(category_id).exec();

            const level = await MentorshipLevel.findById(level_id).exec();

            if(!mentorship_category)
            {
                    return res.status(404).json({success : false,message : "Unable to find mentorship category"})
            }
            if(!level)
            {
                    return res.status(404).json({success : false,message : "Unable to find mentorship level"})
            }

            const mentorship_subscription = new MentorshipSubscription({
                category_id,
                level_id,
                package_name,
                amount,
                frequency,
                capacity
            });

            await mentorship_subscription.save();
            if(!mentorship_subscription)
            {
                return res.status(200).json({success : true,message : "mentorship subscription created successfully"});
            }
            return res.status(500).json({success : true,message : "unable to create mentorship subscription"});
    },
    updateMentorshipSubscription : async function (req,res) {
        const {category_id,level_id, package_name,amount,frequency,capacity} = req.body;

        const mentorship_category = await MentorshipCategory.findById(category_id).exec();

        const level = await MentorshipLevel.findById(level_id).exec();

        const mentorship_sub=  await MentorshipSubscription.findById(req.params.mentorship_subscription_id).exec();

        if(!mentorship_sub)
        {
            return res.status(404).json({success : false,message : "Unable to  mentorship subscription"})
        }

        if(!mentorship_category)
        {
                return res.status(404).json({success : false,message : "Unable to find mentorship category"})
        }
        if(!level)
        {
                return res.status(404).json({success : false,message : "Unable to find mentorship level"})
        }

        const updated = await MentorshipSubscription.findOneAndUpdate({_id : mentorship_sub._id},{
            category_id,
            level_id,
            package_name,
            amount,
            frequency,
            capacity
        },{new : true}).exec();

        return res.status(200).json({success : true,message : "Mentorship subscription updated successfully",mentorship_subscription : updated});

    },
    //fetch single mentorship
    findSinglementorshipSubscription : async function(req,res)
    {
        const mentorship_sub_id = req.params.mentorship_sub_id;
        const mentorship_subscription = await MentorshipSubscription.findOne({_id : mentorship_sub_id,isDeleted : false}).populate({
            path: 'category_id',
            match: { isDeleted: false }
            }
        ).populate({
            path: 'level_id',
            match: { isDeleted: false }
        }).exec();

        if(!mentorship_subscription)
        {
            return res.status(404).json({success : false,message : "Mentorship subscription not found"});
        }

        return res.status(200).json({success : true,message : "mentorship subscription fetched successfully",mentorship_subscription});


    }
    //delete subscription
    ,
    deleteMentorshipSubscription : async function(req,res)
    {
        const mentorship_sub_id = req.params.mentorship_sub_id;
        const mentorship_subscription = await MentorshipSubscription.findOne({_id : mentorship_sub_id,isDeleted : false}).exec();

        if(!mentorship_subscription)
        {
            return res.status(404).json({success : false,message : "Mentorship subscription not found"});
        }

        await MentorshipSubscription.findOneAndUpdate({_id :mentorship_sub_id },{
            isDeleted : true
        }).exec()

        return res.status(200).json({success : true,message : "mentorship subscription deleted successfully"});
    },
    //fetch all subscription 
    fetchAllLevelMentorshipSubscription : async function(req,res)
    {
        const level = req.params.level;
        const mentorship_subscriptions = await MentorshipSubscription.find({level_id: level}).sort({createdAt : -1}).exec();

        return res.status(200).json({success : true,message : "Mentorship subscrip",mentorship_subscriptions})
    },
    //user subscribing for a mentorship
    subscribeUserPackage : async function(req,res)
    {
        const {mentorship_subscription  }  = req.body;

        switch (req.body.gateway) {
            case "paypal":
             
              break;
            case "flutterwave":
                //check payment reference is sent
                if(!("payment_id" in req.body))
                {
                    return res.status(400).json({success :false,message : "Payment reference is needed for flutterwave"});
                }
                var resp =  await this.payWithFlutterWave(
                    mentorship_subscription,
                    req.body.payment_id,
                    req.user
                );

                return res.status(resp.status).json({success : resp.status == 200,message : resp.message});

              break;
            default:
              return res
                .status(500)
                .json({ success: false, message: "Invalid gateway selected " });
          }
    }
,
    payWithFlutterWave : async function(mentorship_sub_id,payment_ref,user)
    {
        const mentorship_sub = await (await MentorshipSubscription.findOne({_id :mentorship_sub_id,isDeleted : false })).populate('category_id').populate('level').exec();

        if(!mentorship_sub)
        {
            return {status: 404,message : "mentorship subscription not found"}
        }

        //very payment 
        
        var body = `Subscribing for  ${mentorship_sub.package_name} under ${mentorship_sub.level_id.title} in  ${mentorship_sub.category_id.title} mentorship`;
        var resp = await Payment.verifyFlutterwave("mentorship_subscription",payment_ref,user,body,mentorship_sub.amount);

        if(resp.success == true)
        {
            //subscribe user
            await UserMentorshipSub.findOneAndUpdate({ user : user._id,
                category : mentorship_sub.category_id._id,
                level : mentorship_sub.level_id._id,
                subscription : mentorship_sub._id,},
                {
                  user : user._id,
                  category : mentorship_sub.category_id._id,
                  level : mentorship_sub.level_id._id,
                  subscription : mentorship_sub._id,
                  amount : mentorship_sub.amount,
                  date_start : moment.now(),
                  date_end : moment.now().add(mentorship_sub.frequency,"days"),
                  status : "active"
            },{
                upsert: true, setDefaultsOnInsert: true
               }).exec();
            return {status: 200,message : "Payment successfull"}
        }else{
            return {status: 400,message : "Payment Failed"}
        }

    },
    fetchUserSubscriptions : async function(req,res)
    {
        const user_subscriptions = await UserMentorshipSub.find({user : req.user._id}).populate('category').populate('subscription').populate('level').sort({createdAt : -1}).exec();

        return res.status(200).json({success : true,message : "User subscriptions fetched succcessfully",user_subscriptions   });

    }
}