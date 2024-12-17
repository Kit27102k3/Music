const validateFacebookLogin = (req, res, next) => {
    const { accessToken, userID } = req.body;
    if (!accessToken || !userID) {
      return res.status(400).json({ error: "Missing accessToken or userID" });
    }
    next();
  };
  
  module.exports = validateFacebookLogin;
  