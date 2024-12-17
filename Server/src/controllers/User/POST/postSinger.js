const Singer = require("../../../models/Singer/Singer");

const postSinger = async (req, res) => {
  const { image, title, follower, userId, userName, link } = req.body;
  if (!title || !userId) {
    return res.status(400).json({ message: "Dữ liệu không hợp lệ" });
  }
  try {
    const existingFollow = await Singer.findOne({ userId, title });
    if (existingFollow) {
      return res.status(200).json({
        message: "Bạn đã theo dõi ca sĩ này",
        data: existingFollow,
        isFollowing: true,
      });
    } else {
      const newFollow = new Singer({
        image,
        title,
        follower,
        userId,
        userName,
        link,
      });
      await newFollow.save();
      return res.status(200).json({
        message: "Theo dõi thành công!",
        data: newFollow,
        isFollowing: true,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Không cập nhật người theo dõi", error });
  }
};

module.exports = postSinger;
