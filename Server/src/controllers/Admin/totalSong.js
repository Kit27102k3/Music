const FavoriteSong = require("../../models/Songs/Songs");

const totalSong = async (req, res) => {
  try {
    const totalSongs = await FavoriteSong.countDocuments({});
    res.json({ totalSongs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ totalSongs: 0 });
  }
};

module.exports = totalSong;
