const Payment = require("../../models/Payment/Payment");

const totalPayment = async (req, res) => {
  try {
    const payments = await Payment.find(); // Get all documents in the Payment collection
    res.json(payments); // Return all users in the response
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving users" });
  }
};

module.exports = totalPayment;
