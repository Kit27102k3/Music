const PlayList = require("../../models/Songs/PlayList");

const totalPlaylist = async (req, res) => {
  try {
    const totalPlaylists = await PlayList.countDocuments({});
    res.json({ totalPlaylists });
  } catch (error) {
    console.error(error);
    res.status(500).json({ totalPlaylists: 0 });
  }
};

module.exports = totalPlaylist;
