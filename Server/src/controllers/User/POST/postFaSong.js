const FavoriteSong = require("../../../models/Songs/FavoriteSongs");

const postFaSong = async (req, res) => {
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
    const existingFavoriteSong = await FavoriteSong.findOne({
      encodeId,
      userId,
    });
    if (existingFavoriteSong) {
      return res
        .status(409)
        .json({ message: "Bài hát đã có trong danh sách yêu thích!" });
    }
    const newFavoriteSong = new FavoriteSong({
      encodeId,
      title,
      artistsNames,
      album,
      thumbnail,
      duration,
      userId,
      userName,
    });
    await newFavoriteSong.save();
    res.status(200).json({ message: "Dữ liệu đã được lưu thành công!" });
  } catch (error) {
    console.error("Lỗi xảy ra:", error);
    res.status(500).json({ error: "Đã xảy ra lỗi phía server!" });
  }
};

module.exports = postFaSong;
