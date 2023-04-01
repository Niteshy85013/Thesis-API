const express = require("express");
const { verify } = require("jsonwebtoken");
const {registerUser, authUser ,deletehireuser,updateHireUser, getHireUser,getAllhireuser} = require("../Controller/hire_user");
const { verifyAdmin, verifyUser } = require("../Middleware/hire_user")
const router = express.Router();

//routes
router.route("/registerUser").post(registerUser)
router.route("/loginUser").post(authUser)

router.put("/:id", updateHireUser);
router.delete("/:id", deletehireuser);
router.get("/:id", getHireUser);
router.get("/", getAllhireuser);

module.exports = router;

