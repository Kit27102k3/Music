const Users = require("../../../models/Users/Users");

const LoginFaceBook = async (req, res) => {
  const { accessToken, userID } = req.body;
  try {
    // Xác thực với Facebook Graph API
    const response = await fetch(
      `https://graph.facebook.com/${userID}?fields=id,name,email,picture.width(400).height(400)&access_token=${accessToken}`
    );
    const data = await response.json();

    if (data.error) {
      console.error("Facebook API Error:", data.error);
      return res
        .status(401)
        .json({ error: "AccessToken hoặc userID không hợp lệ" });
    }

    // Kiểm tra xem người dùng có tồn tại không
    let user = await Users.findOne({ userId: data.id });
    if (!user) {
      // Nếu người dùng không tồn tại, tạo mới
      user = new Users({
        userId: data.id,
        name: data.name,
        email: data.email || "Không có email được cung cấp",
        picture: data.picture?.data?.url || "",
      });
      await user.save();
    } else {
      // Nếu người dùng đã tồn tại, cập nhật thông tin
      user.name = data.name;
      user.email = data.email || "Không có email được cung cấp";
      user.picture = data.picture?.data?.url || "";
      await user.save();
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Lỗi khi đăng nhập Facebook:", err);
    res.status(500).json({ error: "Lỗi máy chủ nội bộ" });
  }
};

module.exports = LoginFaceBook;
