const Users = require("../../models/Users/Users");

const totalUser = async (req, res) => {
  try {
    const totalUsers = await Users.countDocuments({});
    res.json({ totalUsers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ totalUsers: 0 });
  }
};

module.exports = totalUser;
