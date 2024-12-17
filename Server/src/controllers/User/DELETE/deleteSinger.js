const Singer = require("../../../models/Singer/Singer");

const deleteSinger = async (req, res) => {
  const { title, userId } = req.body;
  if (!title || !userId) {
    return res.status(400).json({ message: "Invalid data" });
  }
  try {
    const result = await Singer.deleteOne({ title, userId });

    if (result.deletedCount > 0) {
      return res.status(200).json({
        message: "Bỏ theo dõi thành công !",
        isFollowing: false,
      });
    } else {
      return res.status(404).json({ message: "Follow relationship not found" });
    }
  } catch (error) {
    console.error("Error in /api/follower:", error);
    res.status(500).json({ message: "Failed to unfollow", error });
  }
};

module.exports = deleteSinger;
