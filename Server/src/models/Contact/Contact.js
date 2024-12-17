const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  problem: { type: String, required: true },
  content: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Contact", contactSchema);
