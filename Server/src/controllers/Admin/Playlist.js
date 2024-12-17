const PlayList = require("../../models/Songs/PlayList");

const playlist = async (req, res) => {
  try {
    const favorites = await PlayList.find();
    res.status(200).json({ playlists: favorites });
  } catch (error) {
    console.error("Đã xảy ra lỗi khi hiển thị playlist yêu thích!", error);
    res
      .status(500)
      .json({ error: "Đã xảy ra lỗi khi hiển thị playlist yêu thích!" });
  }
};

module.exports = playlist;
