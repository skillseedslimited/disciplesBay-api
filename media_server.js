// const User = require('./models/User');
// const helpers = require('./helpers/helpers')
// const NodeMediaServer = require('node-media-server');
// const fs = require('fs');
// const pp = require('pp');
// config = require('./config/ffmpeg.config').rtmp_server;
// // fs.chmod(pp, '777', ()=>{
// // helpers.generateStreamThumbnail(stream_key);
// // })
// nms = new NodeMediaServer(config);
// // fs.chmod(pp, '777', function()
// nms.on('prePublish', async (id, StreamPath, args) => {
//     let stream_key = getStreamKeyFromStreamPath(StreamPath);
//     console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
    

//     // validating user before stream
//     User.findOne({stream_key: stream_key}, (err, user) => {
//         if (!err) {
//             if (!user) {
//                 let session = nms.getSession(id);
//                 session.reject();
//             } 
//         }
//     });

// });
 
// const getStreamKeyFromStreamPath = (path) => {
//     let parts = path.split('/');
//     return parts[parts.length - 1];
// };
 
// module.exports = nms;