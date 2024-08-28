// models/emailModel.js
const mongoose = require("mongoose");

const EmailSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  to: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  attachments: [{ type: String }],
  status: { type: String, default: "pending" },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Email", EmailSchema);
