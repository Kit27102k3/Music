const Singer = require("../../models/Singer/Singer");

const singers = async (req, res) => {
  try {
    const followedSingers = await Singer.find();
    res.status(200).json({ singers: followedSingers });
  } catch (error) {
    console.error("Error fetching followed singers:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch followed singers", error });
  }
};

module.exports = singers;
