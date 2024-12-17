const Song = require("../../../models/Songs/Songs");

const getSong = async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: "Thiếu thông tin userId!" });
  }
  try {
    const songs = await Song.find({ userId }).sort({ uploadedAt: -1 });
    if (!songs.length) {
      return res.status(404).json({ error: "Không tìm thấy bài hát nào!" });
    }
    res.status(200).json({ songs });
  } catch (error) {
    console.error("Lỗi xảy ra:", error);
    res.status(500).json({ error: "Đã xảy ra lỗi phía server!" });
  }
};

module.exports = getSong;
