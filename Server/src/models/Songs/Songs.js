const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    encodeId: { type: String, required: true, index: true },
    title: String,
    artistsNames: String,
    album: { type: Object }, // Nếu album là đối tượng, chắc chắn rằng nó được lưu trữ đúng kiểu dữ liệu
    thumbnail: String,
    duration: Number,
    userId: { type: String, required: true, index: true },
    userName: String,
  },
  { timestamps: true }
);

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
