const mongoose = require("mongoose");



const clienthireSchema = mongoose.Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    company_name:{
        type: String,
        required: true
    },
    product_name:{
        type:String,
        required:  true
    },
    information:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        maxlength:10,
        required:true
    }

})

const ClienthireSchema = mongoose.model("ClienthireForm",clienthireSchema);
module.exports = ClienthireSchema;