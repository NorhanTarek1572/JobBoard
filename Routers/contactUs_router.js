const express = require('express');
let router = express();

const nodemailer = require('nodemailer');
require('dotenv').config();


// Define the route for sending emails
router.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  // Create a transporter object with your SMTP configuration
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Create the email message
  const mailOptions = {
    from: process.env.EMAIL_USERNAME,
    to: process.env.RECIPIENT_EMAIL,
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ message: 'Something went wrong. Please try again.' });
    } else {
      console.log('Email sent: ' + info.response);
      res.json({ message: 'Email sent successfully!' });
    }
  });
});

module.exports = router ;