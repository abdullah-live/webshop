const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// Email sending utility
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sharedgpt04@gmail.com",
    pass: "oyjzdcataimxtawv", // Ideally, use environment variables for sensitive data
  },
});

const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: "CC-Frankfurt-UAS-G5",
    to,
    subject,
    html,
  };

  return transporter.sendMail(mailOptions);
};

// Route for sending generic email
router.post("/send-generic-email", async (req, res) => {
  const { to, subject, message } = req.body;

  if (!to || !subject || !message) {
    return res
      .status(400)
      .send("Missing required fields: to, subject, message");
  }

  try {
    await sendEmail(to, subject, `<p>${message}</p>`);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email");
  }
});

// Route for sending contact form email
router.post("/send-contact-email", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res
      .status(400)
      .send("Missing required fields: name, email, phone, message");
  }

  const subject = "New Contact Form Submission";
  const html = `
        <h1>Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
    `;

  try {
    await sendEmail("sharedgpt04@gmail.com", subject, html);
    res.status(200).send("Contact email sent successfully");
  } catch (error) {
    console.error("Error sending contact email:", error);
    res.status(500).send("Failed to send contact email");
  }
});

module.exports = router;
