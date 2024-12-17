const Payment = require("../../../models/Payment/Payment");

const deletePayment = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedPayment = await Payment.findOneAndDelete({ userId });

    if (deletedPayment) {
      res.status(200).json({ message: "Payment deleted successfully" });
    } else {
      res.status(404).json({ message: "Payment not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to delete payment", error });
  }
};

module.exports = deletePayment;
