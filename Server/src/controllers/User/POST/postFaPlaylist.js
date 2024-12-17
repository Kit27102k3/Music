const PlayList = require("../../../models/Songs/PlayList");

const postFaPlaylist = async (req, res) => {
  const {
    title,
    thumbnailM,
    sortDescription,
    encodeId,
    link,
    userId,
    userName,
  } = req.body;

  try {
    const existingPlaylist = await PlayList.findOne({ userId, encodeId });
    if (existingPlaylist) {
      return res
        .status(409)
        .json({ message: "Playlist này đã có trong mục yêu thích" });
    }
    const newFavoritePlaylist = new PlayList({
      title,
      thumbnailM,
      sortDescription,
      encodeId,
      link,
      userId,
      userName,
    });
    await newFavoritePlaylist.save();
    res
      .status(200)
      .json({ message: "Thêm playlist vào mục yêu thích thành công!" });
  } catch (error) {
    console.error("Đã xảy ra lỗi khi thêm playlist:", error);
    res.status(500).json({ error: "Đã xảy ra lỗi khi thêm playlist!" });
  }
};

module.exports = postFaPlaylist;
