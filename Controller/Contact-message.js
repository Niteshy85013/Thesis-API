const Contact = require("../Models/Contact-message")
const asyncHandler = require('express-async-handler')

// Contact
const ContactMessage = asyncHandler(
  async(req, res) => {
      const { fullName, email, desc} = req.body;
      const contact = await Contact.create({ fullName, email, desc });
      if (contact) {
          res.status(201).json({
              _id: contact._id,
              fullName: req.body.fullName,
              email: req.body.email,
              desc: req.body.desc,
               
          })
      } else {
          res.status(400)
          throw new Error("Error Posting Contact")
      }
  }
);

const getAllContact = async (req, res, next) => {
  try {
    var contact = await Contact.find({ contactid: req.body.contactid });
    res.status(200).json({
      success: true,
      message: "List of Contact",
      data: contact,
    } );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
  module.exports = { ContactMessage, getAllContact }