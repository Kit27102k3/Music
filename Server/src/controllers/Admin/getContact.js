const Contact = require("../../models/Contact/Contact");

const getContact = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    console.error("Error fetching contact:", error);
    res.status(500).json({ message: "Failed to fetch contact!" });
  }
};

module.exports = getContact;
