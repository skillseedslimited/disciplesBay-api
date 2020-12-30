// const chmod = require('chmod');
// const fs = require('fs');
// let pp =  require('pp');
// const path = require('path');
// const ffmpeg = require('ffmpeg')
// rtmp://127.0.0.1:1935/live
// var process = new ffmpeg('/path/to/your_movie.avi');
// pp = process.cwd()+'/ffmpeg';
//  fs.chmod("https://api-dev-disciplesbay.herokuapp.com/", 777, ()=> 
// const ffmpegconfig =  {

//     server: {
//         secret: 'kjVkuti2xAyF3JGCzSZTk0YWM5JhI9mgQW4rytXc'
//     },
//     rtmp_server: {
//         rtmp: {
//             port: 1935,
//             chunk_size: 60000,
//             gop_cache: true,
//             ping: 60,
//             ping_timeout: 30
//         },
//         http: {
//             port: 8888,
//             mediaroot: './server/media',
//             allow_origin: '*'
//         },
//         trans: {
//             // '/app/vendor/ffmpeg'
//             ffmpeg: process.cwd()+'/ffmpeg',
//             tasks: [
//                 {
//                     app: 'live',
//                     hls: true,
//                     hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
//                     dash: true,
//                     dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
//                 }
//             ]
//         }
//     }
// }
// fs.chmod(pp, '0777', function())
// const ffmpegconfig = {
//     server: {
//         secret: 'kjVkuti2xAyF3JGCzSZTk0YWM5JhI9mgQW4rytXc'
//     },
//     rtmp_server: {
//         rtmp: {
//             port: 1935,
//             chunk_size: 60000,
//             gop_cache: true,
//             ping: 60,
//             ping_timeout: 30
//         },
//         http: {
//             port: 8888,
//             mediaroot: './server/media',
//             allow_origin: '*'
//         },
//         trans: {
//             // '/app/vendor/ffmpeg'
//             // process.cwd()+'/ffmpeg'
//             // '/usr/bin/ffmpeg'
//             // var process = new ffmpeg('/path/to/your_movie.avi');
//             ffmpeg: '/usr/bin/ffmpeg',
//             tasks: [
//                 {
//                     app: 'live',
//                     hls: true,
//                     hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
//                     dash: true,
//                     dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
//                 }
//             ]
//         }
//     }
// };
// ::::::::::::::::::::::::::::::::::::::::::::::::::::FINAL TRIAL::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
// const NodeMediaServer = require('node-media-server')


// const config = {
//   rtmp: {
//     port: 1935,
//     chunk_size: 60000,
//     gop_cache: true,
//     ping: 30,
//     ping_timeout: 60,
//   },
//   http: {
//     port: 8000,
//     allow_origin: '*',
//   },
// }


// var nms = new NodeMediaServer(config)
// nms.run()

 
// module.exports = ffmpegconfig;