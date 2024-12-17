const FavoriteSong = require("../../../models/Songs/FavoriteSongs");

const deleteFaSong = async (req, res) => {
  const { encodeId, userId } = req.body;
  try {
    const response = await FavoriteSong.deleteOne({ encodeId, userId });
    if (response.deletedCount > 0) {
      return res.status(200).json({
        message: "Xóa bài hát ra khỏi danh sách yêu thích thành công!",
      });
    } else {
      return res
        .status(404)
        .json({ message: "Bài hát không tìm thấy trong danh sách yêu thích!" });
    }
  } catch (error) {
    console.error("Đã xảy ra lỗi khi xóa bài hát khỏi mục yêu thích:", error);
    return res.status(500).json({ message: "Lỗi máy chủ", error });
  }
};

module.exports = deleteFaSong;
