const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'notesv2.mail@gmail.com',
    pass: 'yoocmarkyjerosjd'
  }
});

const mailOptions = {
  from: 'notesv2.mail@gmail.com',
  to: 'vishalbhangare2@gmail.com',
  subject: 'This is mail for confirm your account',
  html: '<h1>Confirm your accocunt</h1><br><button><a href="www.google.com" target="_blank">Confirm</a></button>'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
 console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
    // do something useful
  }
});