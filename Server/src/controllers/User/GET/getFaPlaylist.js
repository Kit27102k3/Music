const PlayList = require("../../../models/Songs/PlayList");

const getFaPlaylist = async (req, res) => {
  const { userId } = req.query;
  if (!userId) {
    return res.status(400).json({ error: "Yêu cầu phải có userId" });
  }
  try {
    const favorites = await PlayList.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(favorites);
  } catch (error) {
    console.error("Đã xảy ra lỗi khi hiển thị playlist yêu thích!", error);
    res
      .status(500)
      .json({ error: "Đã xảy ra lỗi khi hiển thị playlist yêu thích!" });
  }
};
module.exports = getFaPlaylist;
