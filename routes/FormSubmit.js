const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5002;

app.use(bodyParser.json());

app.post('/submit-contact-form', (req, res) => {
  const { name, email, message } = req.body;

  // Configure nodemailer to send email 
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'ramigypatex@gmail.com',
      pass: 'toutou7042001',
    },
  });

  // Email content
  const mailOptions = {
    from: 'ramigypatex@gmail.com',
    to: 'kitsunetun@gmail.com',  
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
