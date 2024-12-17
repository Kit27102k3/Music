const mongoose = require("mongoose");

const singerSchema = new mongoose.Schema({
  image: String,
  link: String,
  title: String,
  follower: { type: Number, default: 0 },
  userId: String,
  userName: String,
  isFollowing: { type: Boolean, default: true },
});

module.exports = mongoose.model("Singer", singerSchema);
