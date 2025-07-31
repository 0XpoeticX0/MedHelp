import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Somewhere in your code – *do not* create a new transporter each time
const sendEmail = async (email, name, subject, message) => {
  await transporter.sendMail({
    from: `"${name}" <${email}>`,
    to: "utshoroy521@gmail.com",
    subject: subject,
    text: message,
    html: `<p><strong>From:</strong> ${name}</p><p><strong>Email:</strong> (${email})</p><p><strong>Message:</strong></p><p>${message}</p>`,
  });
};

export default sendEmail;
