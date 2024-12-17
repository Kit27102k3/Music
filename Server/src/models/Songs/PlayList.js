const mongoose = require("mongoose");

const PlayListSchema = new mongoose.Schema(
  {
    title: String,
    thumbnailM: { type: String, required: true },
    sortDescription: { type: String, required: false },
    link: { type: String, required: true },
    encodeId: { type: String, required: true, index: true },
    userId: { type: String, required: true },
    userName: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("PlayList", PlayListSchema);
