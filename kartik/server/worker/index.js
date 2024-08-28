// workers/emailWorker.js
const Queue = require("bull");
const nodemailer = require("nodemailer");
const Email = require("../model/emailModel");
const emailQueue = new Queue("email", process.env.REDIS_URL);

emailQueue.process(async (job, done) => {
  const { emailId } = job.data;

  try {
    const email = await Email.findById(emailId);
    if (!email) {
      throw new Error("Email not found");
    }

    // Send email using Nodemailer
    const transporter = nodemailer.createTransport({
      service: "SendGrid",
      auth: {
        user: "apikey",
        pass: process.env.SENDGRID_API_KEY,
      },
    });

    const mailOptions = {
      from: "your-email@example.com",
      to: email.to,
      subject: email.subject,
      text: email.body,
    };

    await transporter.sendMail(mailOptions);

    // Update email status
    email.status = "sent";
    await email.save();

    // Emit real-time status update (assuming you have set up Socket.io)
    // io.emit('status-update', { emailId, status: 'sent' });

    done();
  } catch (error) {
    console.error("Failed to process email:", error);
    done(new Error("Failed to send email"));
  }
});
