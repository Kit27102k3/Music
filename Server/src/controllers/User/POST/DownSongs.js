const Song = require("../../../models/Songs/Songs");

const DownSongs = async (req, res) => {
  const {
    encodeId,
    title,
    artistsNames,
    album,
    thumbnail,
    duration,
    userId,
    userName,
  } = req.body;
  try {
    // Kiểm tra nếu bài hát đã tồn tại
    const existingSong = await Song.findOne({ encodeId, userId });
    if (existingSong) {
      return res
        .status(409)
        .json({ message: "Bài hát đã có trong danh sách tải!" });
    }
    const newSong = new Song({
      encodeId,
      title,
      artistsNames,
      album,
      thumbnail,
      duration,
      userId,
      userName,
      uploadedAt: new Date(),
    });
    await newSong.save();
    res.status(200).json({ message: "Bài hát đã được tải thành công!" });
  } catch (error) {
    console.error("Lỗi xảy ra:", error);
    res.status(500).json({ error: "Đã xảy ra lỗi phía server!" });
  }
};

module.exports = DownSongs;
