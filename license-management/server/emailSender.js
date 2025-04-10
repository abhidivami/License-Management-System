// server/emailSender.js

const nodemailer = require('nodemailer');
require('dotenv').config();

console.log("Email user from env:", process.env.EMAIL_USER);
console.log("Email password from env:", process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendLicenseExpiryEmail = async (toEmail, licenseName, daysLeft, expiryDate) => {
    const mailOptions = {
        from: `"License Management System" <${process.env.EMAIL_USER}>`,
        to: toEmail,
        subject: `⚠️ ${licenseName} License Expiry in ${daysLeft} Days`,
        html: `
            <p>Hi,</p>
            <p>This is a reminder that <strong>${licenseName}</strong> license will expire in <strong>${daysLeft} days</strong>.</p>
            <p>Expiry Date: <strong>${expiryDate}</strong></p>
            <br />
            <p>Regards,<br/>License Management Team</p>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent:", info.response);
    } catch (err) {
        console.error("❌ Failed to send email:", err); // <-- check this in your terminal
        throw err; // rethrow so Express returns 500
    }
};


module.exports = { sendLicenseExpiryEmail };
