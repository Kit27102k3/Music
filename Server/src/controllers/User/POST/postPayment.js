const Payment = require("../../../models/Payment/Payment");

const postPayment = async (req, res) => {
  try {
    const { userName, userId, name, price, dateNow, upgrade, title } = req.body;
    if (
      !userName ||
      !userId ||
      !name ||
      !price ||
      !dateNow ||
      !upgrade ||
      !title
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const payment = new Payment({
      userName,
      userId,
      name,
      price,
      dateNow: new Date(dateNow),
      upgrade: new Date(upgrade),
      title,
    });
    const savedPayment = await payment.save();
    res.status(201).json({ message: "Payment created", payment: savedPayment });
  } catch (error) {
    console.error("Error creating payment:", error); // Log lỗi
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

module.exports = postPayment;
