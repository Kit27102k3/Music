const Singer = require("../../../models/Singer/Singer");

const getSinger = async (req, res) => {
  const { userId, isFollowing } = req.query; 
  if (!userId) {
    return res.status(400).json({ error: "Yêu cầu phải có userId" });
  }
  try {
    const singers = await Singer.find({ userId });
    res.status(200).json(singers); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Đã xảy ra lỗi khi lấy dữ liệu" }); 
  }
};

module.exports = getSinger;
