const FavoriteSong = require("../../../models/Songs/FavoriteSongs");

const getFaSong = async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: "Thiếu userId!" });
  }
  try {
    const favoriteSongs = await FavoriteSong.find({ userId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ songs: favoriteSongs });
  } catch (error) {
    console.error("Lỗi xảy ra:", error);
    res.status(500).json({ error: "Đã xảy ra lỗi phía server!" });
  }
};

module.exports = getFaSong;
