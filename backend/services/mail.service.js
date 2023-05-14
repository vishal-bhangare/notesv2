const nodemailer = require('nodemailer');

module.exports =  async function sendMail(mail_to, mail_subject, mail_html){
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });
  
  const mailOptions = {
    from: process.env.MAIL_USER,//'notesv2.mail@gmail.com',
    to: mail_to ,//'vishalbhangare2@gmail.com',
    subject: mail_subject,
    html: mail_html//'<h1>Confirm your accocunt</h1><br><button><a href="www.google.com" target="_blank">Confirm</a></button>'
  };
  
  await transporter.sendMail(mailOptions, function(error, info){
    if (error) {
   console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

//sendMail('vishalbhangare2@gmail.com',"test mail","<p>Test mail 1112</p>")