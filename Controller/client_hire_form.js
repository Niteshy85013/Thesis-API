const ClienthireSchema = require("../Models/client-hire-form")
const asyncHandler = require('express-async-handler')

// Client_Hire_Form
// Add Function
const ClientForm = asyncHandler(
  async(req, res) => {
      const { first_name, last_name, company_name,product_name,information,phone} = req.body;
      const clientform = await ClienthireSchema.create({first_name, last_name, company_name,product_name,information,phone});
      if (clientform) {
          res.status(201).json({
              _id: clientform._id,
              first_name: req.body.first_name,
               last_name: req.body.last_name,
               company_name: req.body.company_name,
               product_name: req.body.product_name,
               information: req.body.information,
               phone: req.body.phone
          })
      } else {
          res.status(400)
          throw new Error("Error Posting Contact")
      }
  }
);

// Get By ID

const getClienthireForm = async(req, res, next) => {
    try {
        const getclientform = await ClienthireSchema.findById(
            req.params.id
        );
        res.status(200).json(getclientform)
    } catch (error) {
        next(error)
  
    }
  
  }

// Get All Function
const getAllClienthireform = async (req, res, next) => {
  try {
    var clientform = await ClienthireSchema.find({ clientformid: req.body.clientformid });
    res.status(200).json({
      success: true,
      message: "List of ClientForm",
      data: clientform,
    } );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update Note
const updateClientform = async(req, res, next) => {
    try {
        const updClientform = await ClienthireSchema.findByIdAndUpdate(
            req.params.id, { $set: req.body }, { new: true }
        );
        res.status(200).json({
            success: true,
            message: "Data for Udpate",
            data: updClientform,
          });
    } catch (error) {
      
        next(error);
    }
  }
   // Delete Note
  const deleteClentform = async(req, res, next) => {
    try {
        const delClientform = await ClienthireSchema.findByIdAndDelete(
            req.params.id,
        );
        res.status(200).json({
            success: true,
            message: "Client form  deleted successfully",
            data: delClientform,
          });
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
  }
  module.exports = { ClientForm,deleteClentform,updateClientform, getAllClienthireform, getClienthireForm}