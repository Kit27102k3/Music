const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  picture: { type: String, required: true },
});

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
