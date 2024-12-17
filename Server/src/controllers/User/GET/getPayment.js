const Payment = require("../../../models/Payment/Payment");

const getPayment = async (req, res) => {
  const { userId } = req.params;
  try {
    const payment = await Payment.findOne({ userId });
    if (payment) {
      res.json({ exists: true, payment: payment });
    } else {
      res.json({ exists: false });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ exists: false });
  }
};

module.exports = getPayment;
