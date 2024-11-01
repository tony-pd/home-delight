const dotenv = require("dotenv");
const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

dotenv.config();

const smtpDetails = {
  //host: 'smtp.sendgrid.net',
  //port: 465,
  //host: "smtp.gmail.com",
  //port: 578,
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
};

function updateTemplate(content, obj) {
  let keysArr = Object.keys(obj);
  keysArr.forEach((key) => {
    content = content.replace(`#{${key}}`, obj[key]);
  });
  return content;
}

const emailSender = async (email, subject, template, obj) => {
  const templatePath = path.join(__dirname, "templates", template);
  const content = await fs.promises.readFile(templatePath, "utf8");
  const finalContent = updateTemplate(content, obj);

  const transporter = nodemailer.createTransport(smtpDetails);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: subject,
    //text: message,
    html: finalContent
  };

  transporter
    .sendMail(mailOptions)
    .then((info) => {
      console.log("Email sent: " + info.response);
    })
    .catch((err) => {
      console.log("Error occurred: " + err.response);
    });
};

module.exports = emailSender;
