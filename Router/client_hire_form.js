const express = require('express');
const { ClientForm,deleteClentform,updateClientform, getAllClienthireform, getClienthireForm} = require("../Controller/client_hire_form");
const router = express.Router();


// Routes
router.route("/add").post(ClientForm)
router.get("/",getAllClienthireform);
router.put("/:id",updateClientform);
router.delete("/:id", deleteClentform);
router.get("/:id", getClienthireForm);
module.exports = router;