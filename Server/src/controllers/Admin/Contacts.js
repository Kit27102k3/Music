const Contact = require("../../models/Contact/Contact");

const Contacts = async (req, res) => {
  try {
    const totalFeedback = await Contact.countDocuments({});
    res.json({ totalFeedback });
  } catch (error) {
    console.error(error);
    res.status(500).json({ totalFeedback: 0 });
  }
};

module.exports = Contacts;
