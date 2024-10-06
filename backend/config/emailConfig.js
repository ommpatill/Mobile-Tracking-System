// backend/config/emailConfig.js
const nodemailer = require('nodemailer');
require('dotenv').config(); // Ensure you import dotenv to access environment variables

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Using Gmail as the email service
  auth: {
    user: process.env.SMTP_USER, // Your email from .env
    pass: process.env.SMTP_PASS, // Your app password from .env
  },
});

// Function to send verification email
const sendVerificationEmail = (to, verificationLink) => {
  const mailOptions = {
    from: process.env.SMTP_USER, // Using the email from .env
    to,
    subject: 'Please verify your email address',
    text: `Click this link to verify your email: ${verificationLink}`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendVerificationEmail };
