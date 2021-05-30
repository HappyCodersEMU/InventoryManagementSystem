require("dotenv").config();
const nodemailer = require("nodemailer");
const config = require("../../config/mailAuth.js");
var os = require("os");


const user = config.user;
const pass = config.pass;

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: user,
        pass: pass,
    },
});

module.exports.sendConfirmationEmail = async (name, email, confirmationCode) => {
    console.log("user: ", os.hostname())
    try {
        await transport.sendMail({
            from: user,
            to: email,
            subject: "Please confirm your account",
            html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:5000/api/mail/test/confirm/${confirmationCode}> Click here</a>
        </div>`,
        })
    }
     catch (err) {
        console.log(err)
        throw err
    };
};