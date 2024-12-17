const Contact = require("../../../models/Contact/Contact");

const postContact = async (req, res) => {
  const { problem, content, userName, email, phone, userId } = req.body;
  try {
    const contact = new Contact({
      userId,
      problem,
      content,
      userName,
      email,
      phone,
    });
    await contact.save();
    res.status(200).json({ message: "Gửi phản hồi thành công!" });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ message: "Gửi phản hồi thất bại!" });
  }
};

module.exports = postContact;
