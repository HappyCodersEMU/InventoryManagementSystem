require("dotenv").config();
const nodemailer = require("nodemailer");

const user = process.env.MAIL_USER;
const pass = process.env.MAIL_PASS;

const transport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: user,
        pass: pass,
    },
});

module.exports.sendConfirmationEmail = async (name, email, confirmationCode, redirectUrl) => {
    try {
        await transport.sendMail({
            from: user,
            to: email,
            subject: "Please confirm your account",
            html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:5000/api/auth/confirm/${confirmationCode}?redirect=${redirectUrl}> Complete registration</a>
        </div>`,
        })
    }
    catch (err) {
        console.log(err)
        throw err
    };
};