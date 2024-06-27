const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodeMailer = require('nodemailer');
const path = require('path');
const dotenv = require('dotenv');
const { v4: uuidv4 } = require('uuid');
const s3 = require('../config/awsS3');

dotenv.config();

// bcrypt password
const validPassword = (dbPassword, passwordToMatch) => {
    return bcrypt.compareSync(passwordToMatch, dbPassword);
};

const safeModel = () => {
    return _.omit(this.toObject(), ['password', '__v']);
};

const generatePassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), process.env.PASS_SECRET);
};

// const generateToken = () => {
//     return jwt.sign({
//         _id: this._id,
//         username: this.username,
//         type: this.type
//     }, process.env.JWT_SECRET)
// }

// generate Random Password

function generateRandomPassword() {
    var length = 12,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_-+=",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

// generateOTP
function generateOTP() {
    const digits = '123456789';
    let otp = '';
    for (let i = 1; i <= 6; i++) {
        let index = Math.floor(Math.random() * (digits.length));
        otp = otp + digits[index];
    }
    return otp;
}

// send mail
let sendEmail = async (toEmail, subject, bodyHtml, attachments) => {
    const transporter = nodeMailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    let mailOptions = {
        to: toEmail,
        subject: subject,
        html: `${bodyHtml}`,
        attachments: attachments
    };

    await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};




module.exports = {
    validPassword,
    safeModel,
    generateRandomPassword,
    generatePassword,
    // generateToken,
    generateOTP,
    sendEmail
}