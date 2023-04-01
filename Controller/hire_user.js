const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const HireUser = require('../Models/hire')

//Register Function
const registerUser = asyncHandler(
    async(req, res) => {
        const { username, email, password, phone, address, fullname} = req.body;
        const hireuserExits = await HireUser.findOne({ username });
        if (hireuserExits) {
            res.status(400)
            throw new Error("User already exits");
        }
        const hireuser = await HireUser.create({ fullname, username, email, password, address, phone, });
        if (hireuser) {
            res.status(201).json({
                _id: hireuser._id,
                fullname: hireuser.fullname,
                username: hireuser.username,
                email: hireuser.email,
                phone: hireuser.phone,
                address: hireuser.address,
                password: hireuser.password,
                isAdmin: hireuser.isAdmin,
            })
        } else {
            res.status(400)
            throw new Error("Error while Registering User")
        }
    }
);
 

// login function
const authUser = asyncHandler(
    async(req, res) => {
        const { username, password, } = req.body;
        const hireuser = await HireUser.findOne({ username });
        if (!hireuser) return res.status(400).json({ message: "User not found" });

        if (hireuser == null) {
                    let err = new Error(`User ${req.body.username} not been found `);
                    res.status(404);
                    return next(err);
                  }
  

        const token = jwt.sign({ id: hireuser._id, isAdmin: hireuser.isAdmin }, process.env.JWT, {
            expiresIn: "1d"
        });
        if (hireuser && (await hireuser.matchpassword(password))) {
            res.json({
                _id: hireuser._id,
                username: hireuser.username,
                password: hireuser.password,
                isAdmin: hireuser.isAdmin,
                pic: hireuser.pic,
                token
            })
            const { username,password, isAdmin, ...otherDetails } = hireuser._doc
            res.cookie("Acess token", token, {
                httpOnly: true
            }).status(200).json({
                details: {...otherDetails },
                isAdmin,
                token
            })
        } else {
            res.status(400)
            throw new Error("Invalid Email or Password")
        }
    }

);


const updateHireUser = async (req, res, next) => {
    try {
      const updatedhireuser = await HireUser.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
  
      res.status(200).json(updateUser);
      res.status(200).json("user has been updated");
    } catch (error) {
      next(error);
    }
  };
  
  const deletehireuser = async (req, res, next) => {
    try {
      const updatedhireuser = await HireUser.findByIdAndDelete(req.params.id);
  
      res.status(200).json("user has been Deleted");
    } catch (error) {
      next(error);
    }
  };
  
  const getAllhireuser = async (req, res, next) => {
    try {
      const hireusers = await HireUser.find();
  
      res.status(200).json({data : [hireusers]});
    } catch (error) {
      next(error);
    }
  };
  
  const getHireUser = async (req, res, next) => {
    try {
      const hireusers = await HireUser.findById(req.params.id);
  
      res.status(200).json({data : [hireusers]});
    } catch (error) {
      next(error);
    }
  };
module.exports = { registerUser, authUser ,deletehireuser,updateHireUser, getHireUser,getAllhireuser}