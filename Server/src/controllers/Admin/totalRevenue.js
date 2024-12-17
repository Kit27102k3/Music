const Payment = require("../../models/Payment/Payment");

const totalRevenue = async (req, res) => {
  try {
    const payments = await Payment.find({});
    const totalRevenue = payments.reduce(
      (acc, payment) => acc + parseFloat(payment.price),
      0
    );
    res.json({ totalRevenue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ totalRevenue: 0 });
  }
};
module.exports = totalRevenue;
