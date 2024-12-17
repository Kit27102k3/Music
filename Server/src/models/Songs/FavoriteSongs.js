const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    encodeId: { type: String, required: true },
    title: { type: String, required: true },
    artistsNames: { type: [String], required: true },
    album: { type: String, required: true },
    thumbnail: { type: String, required: true },
    duration: { type: Number, required: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
  },
  { timestamps: true }
); // Tự động tạo createdAt và updatedAt

module.exports = mongoose.model("FavoriteSong", songSchema);
