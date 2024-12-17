const validateDownSongs = (req, res, next) => {
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

  if (
    !encodeId ||
    !title ||
    !artistsNames ||
    !album ||
    !thumbnail ||
    !duration ||
    !userId ||
    !userName
  ) {
    return res.status(400).json({ error: "Thiếu thông tin cần thiết!" });
  }
  next();
};

module.exports = validateDownSongs;
