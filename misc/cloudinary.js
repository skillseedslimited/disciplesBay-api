const {uploader} = require('../config/cloudinary.config');
const { dataUri} = require('../middlewares/multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const ErrorResponse = require('../utils/errorResponse');

const imageFileFilter =  (file) => (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg"); 
const audioFileFilter =  (file) => (file.mimetype === "audio/mp3" || file.mimetype === "audio/mpeg");
const videoFileFilter =  (file) => (file.mimetype === "video/mp4" || file.mimetype === "application/mp4");
const pdfFileFilter =  (file) => (file.mimetype === "application/pdf");

const uploadImageSingle = async(req, next, type_id = null) => {
    //console.log('req.file :', req.file);
    const userId = uuidv4();
    let file_key = "";

    if(req.image) {
        if(imageFileFilter(req.image)){
           
            const file = dataUri(req).content;
            console.log(file)
            return uploader.upload(file, {public_id:`${userId}-${req.image.originalname}`})
            .then((result) => {
                const ext = path.extname(req.image.originalname).toString();
                const url = result.url;
                //MediaLinkStore.create(req,res,next,url,type_id)
                return url;
            })
            .catch(err => next(new ErrorResponse('someting went wrong while processing your request',400)));
        }else{
           return next(new ErrorResponse('Invalid file format. Only .png, .jpg and .jpeg formats are allowed!', 400));
        }
    }else{
        return next(new ErrorResponse('No file sent', 400));
    }
}


// const uploadAudioSingle = async(req, res, next, type_id = null) => {
//     //console.log('req.file :', req.file);
//     const userId = uuidv4();
//     let file_key = "";
//     if(req.audio) {
//         if(auaudioFilter(req.audio)){
//             const file = dataUri(req.audio).content;
//             return uploader.upload_large(file, {
//                 resource_type: "auto",
//                 public_id:`${userId}-${req.audio.originalname}`,
//                 chunk_size: 6000000
//             })
//             .then((result) => {
//                 const ext = path.extname(req.audio.originalname).toString()
//                 const url = result.url;
//                MediaLinkStore.create(req,res,next,url,type_id)
//             })
//             .catch(err => res.status(400).json({
//                 messge: 'someting went wrong while processing your request',
//                 data: { err }
//             }))
//         }else{
//             next(new ErrorResponse('Invalid file format. Only .mp3 format is allowed!', 400));
//         }
//     }else{
//         next(new ErrorResponse('No file sent', 400));
//     }
// }

// const uploadVideoSingle = async(req, res, next, type_id = null) => {
//     //console.log('req.file :', req.file);
//     const userId = uuidv4();
//     let file_key = "";
//     if(req.video) {
//         if(videoFileFilter(req.video)){
//             const file = dataUri(req.video).content;
//             return uploader.upload_large(file, {
//                 resource_type: "auto",
//                 public_id:`${userId}-${req.video.originalname}`,
//                 chunk_size: 6000000
//             })
//             .then((result) => {
//                 const ext = path.extname(req.video.originalname).toString()
//                 const url = result.url;
//                MediaLinkStore.create(req,res,next,url,type_id)
//             })
//             .catch(err => res.status(400).json({
//                 messge: 'someting went wrong while processing your request',
//                 data: { err }
//             }))
//         }else{
//             next(new ErrorResponse('Invalid file format. Only .mp3 format is allowed!', 400));
//         }
//     }else{
//         next(new ErrorResponse('No file sent', 400));
//     }
// }
module.exports = {
    uploadImageSingle,
    // uploadAudioSingle,
    // uploadVideoSingle
}