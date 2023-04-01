
const mongoose = require ('mongoose')
const bcrypt = require("bcryptjs")

const hireSchema = mongoose.Schema({
    username:{
        type: String,
        require: true,
    },
    fullname:{
        type: String,
    },
    password:{
        type:String,
        require: true,
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
    },
    phone:{
        type:String,

    },
    // userImage:{
    //     type: String
    // },
    isAdmin:{
        type: Boolean,
        require: true,
        default: false
    }
     
},
{timestamps:true}
)

//encryting password
hireSchema.pre("save", async function(name) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
});



//comapring password

hireSchema.methods.matchpassword = async function(enteredPassword) {

    return await bcrypt.compare(enteredPassword, this.password);

}

module.exports = mongoose.model('HireUser',hireSchema)

