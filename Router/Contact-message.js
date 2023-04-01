const express = require('express');
const { ContactMessage, getAllContact } = require("../Controller/Contact-message");
const router = express.Router();


// Routes
router.route("/add").post(ContactMessage)
router.get("/",getAllContact);

module.exports = router;