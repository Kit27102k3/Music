const FavoriteSong = require("../../models/Songs/FavoriteSongs");

const Song = async (req, res) => {
  try {
    const favoriteSongs = await FavoriteSong.find();
    res.status(200).json({ songs: favoriteSongs });
  } catch (error) {
    console.error("Lỗi xảy ra:", error);
    res.status(500).json({ error: "Đã xảy ra lỗi phía server!" });
  }
};

module.exports = Song;
