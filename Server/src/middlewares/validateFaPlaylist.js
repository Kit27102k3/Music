const validateFaPlaylist = (req, res, next) => {
  const {
    title,
    thumbnailM,
    sortDescription,
    encodeId,
    link,
    userId,
    userName,
  } = req.body;

  if (!title || !thumbnailM || !link || !userId || !userName || !encodeId) {
    return res.status(400).json({ error: "Thiếu thông tin cần thiết!" });
  }
  next();
};

module.exports = validateFaPlaylist;
