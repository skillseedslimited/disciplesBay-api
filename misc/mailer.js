const config = require('../config/mailer');
const nodemailer = require('nodemailer');

//Creating or building the transport object
const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // use SSL
    auth: {
        user: config.GMAIL_USER,
        pass: config.GMAIL_PASS
    },
});

// Making this whole file available
module.exports = {
    sendEmail(from, to, subject, html) {
        return new Promise((resolve, reject) => {
            transport.sendMail({ from, to, subject, html }, (err, info) => {
                if (err) reject(err);
                resolve(info);
            });
        });
    }
}
