// controllers/emailController.js
const Email = require("../models/emailModel");
const Queue = require("bull");
const emailQueue = new Queue("email", process.env.REDIS_URL);

// Compose and save email
exports.composeEmail = async (req, res) => {
  const { user_id, to, subject, body, attachments } = req.body;

  try {
    const email = new Email({ user_id, to, subject, body, attachments });
    await email.save();
    res.status(201).json({ message: "Email composed successfully", email });
  } catch (error) {
    res.status(500).json({ error: "Failed to compose email" });
  }
};

// Queue email for sending
exports.sendEmail = async (req, res) => {
  const { emailId } = req.body;

  try {
    const email = await Email.findById(emailId);
    if (!email) {
      return res.status(404).json({ error: "Email not found" });
    }

    emailQueue.add({ emailId });
    res.status(200).json({ message: "Email queued for sending" });
  } catch (error) {
    res.status(500).json({ error: "Failed to queue email" });
  }
};

// Get email status
exports.getEmailStatus = async (req, res) => {
  const { id } = req.params;

  try {
    const email = await Email.findById(id);
    if (!email) {
      return res.status(404).json({ error: "Email not found" });
    }

    res.status(200).json({ status: email.status });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch email status" });
  }
};
