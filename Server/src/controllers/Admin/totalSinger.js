const Singer = require("../../models/Singer/Singer");

const totalSinger = async (req, res) => {
  try {
    const totalSingers = await Singer.countDocuments({});
    res.json({ totalSingers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ totalSingers: 0 });
  }
};

module.exports = totalSinger;
