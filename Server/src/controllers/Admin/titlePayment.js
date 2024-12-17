const Payment = require("../../models/Payment/Payment");
const Users = require("../../models/Users/Users");

const titlePayment = async (req, res) => {
  const { userId } = req.params;
  try {
    // Tìm người dùng bằng userId
    const user = await Users.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Tìm payment liên quan tới userId
    const payments = await Payment.find({ userId });
    if (payments.length > 0) {
      // Lấy tất cả title từ các payment tìm thấy
      const titles = payments.map((payment) => payment.title);
      res.json({ userId, titles });
    } else {
      res.json({ userId, titles: [] }); // Trả về mảng rỗng nếu không tìm thấy payment
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = titlePayment;
