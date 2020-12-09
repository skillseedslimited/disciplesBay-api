const chmod = require('chmod');
const fs = require('fs');
let pp =  require('pp');
const path = require('path');
// pp = process.cwd()+'/ffmpeg';

// const ffmpegconfig = chmod(process.cwd()+'/ffmpeg',{
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
// })
// fs.chmod(pp, '0777', function())
const ffmpegconfig = {
    server: {
        secret: 'kjVkuti2xAyF3JGCzSZTk0YWM5JhI9mgQW4rytXc'
    },
    rtmp_server: {
        rtmp: {
            port: 1935,
            chunk_size: 60000,
            gop_cache: true,
            ping: 60,
            ping_timeout: 30
        },
        http: {
            port: 8888,
            mediaroot: './server/media',
            allow_origin: '*'
        },
        trans: {
            // '/app/vendor/ffmpeg'
            // process.cwd()+'/ffmpeg'
            ffmpeg: '/app/vendor/ffmpeg/',
            tasks: [
                {
                    app: 'live',
                    hls: true,
                    hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
                    dash: true,
                    dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
                }
            ]
        }
    }
};
 
module.exports = ffmpegconfig;