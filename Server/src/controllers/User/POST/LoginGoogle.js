const { OAuth2Client } = require("google-auth-library");
const Users = require("../../../models/Users/Users");
const Admin = require("../../../models/Admin/Admin");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const LoginGoogle = async (req, res) => {
  const { idToken } = req.body;
  try {
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const userId = payload["sub"];
    const email = payload["email"];
    const name = payload["name"];
    const picture = payload["picture"];

    // Kiểm tra nếu người dùng là admin
    const isAdmin =
      email === process.env.ADMIN_ACCOUNT && name === process.env.ADMIN_TITLE;

    // Nếu là admin, chỉ lưu thông tin vào Admin
    if (isAdmin) {
      let admin = await Admin.findOne({ userId });
      if (!admin) {
        // Lưu thông tin admin vào CSDL
        admin = new Admin({
          userId,
          email,
          name,
          picture,
        });
        await admin.save();
      }
      // Phản hồi cho admin
      return res.json({ userId, email, name, picture, isAdmin: true });
    }

    // Nếu không phải là admin, kiểm tra trong bảng Users
    let user = await Users.findOne({ userId });
    if (!user) {
      user = new Users({
        userId,
        email,
        name,
        picture,
      });
      await user.save();
    }

    // Phản hồi cho người dùng thông thường
    res.json({ userId, email, name, picture, isAdmin: false });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = LoginGoogle;
