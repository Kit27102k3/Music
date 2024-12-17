const mongoose = require("mongoose");

const paymentSchema = mongoose.Schema({
  userName: { type: String, required: true },
  userId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  dateNow: { type: Date, required: true }, // Lưu ngày tạo dưới dạng Date
  upgrade: { type: Date, required: true }, // Lưu ngày hết hạn dưới dạng Date
  title: { type: String, required: true },
});

paymentSchema.index({ upgrade: 1 });

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
