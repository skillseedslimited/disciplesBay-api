const s3 = require("../config/aws.config");
require("dotenv").config();
module.exports = {
 signUrl : async function(req,res)
 {
    const file_name = req.query.file_name;
    const file_type = req.query.file_type;
    const bucket_name = process.env.S3_BUCKET
    const s3Params = {
      Bucket: bucket_name,
      Key: file_name,
      Expires: 60,
      ContentType: file_type,
      ACL: 'public-read'
    };
    
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        console.log(err);
        return res.status(500).json({success : false,message : "Unable to presign file"});
      }
      const returnData = {
        signedRequest: data,
        url: `https://${bucket_name}.s3.amazonaws.com/${file_type}`
      };
      return res.status(200).json({success : true,message : "File presigned successfully","data" : returnData});

    });
 },
 
}