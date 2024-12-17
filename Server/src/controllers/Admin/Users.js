const Users = require("../../models/Users/Users");

const User = async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = User;
