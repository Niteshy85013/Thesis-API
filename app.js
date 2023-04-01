const express = require("express");
const morgan = require("morgan");
const app = express();
const connectDB = require("./Config/db");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
 
require("colors");

app.use(cors());
app.options("*", cors());

dotenv.config({
    path: "./Config/config.env",
});

// Connect to mongodb Server
connectDB();


//middleware
app.use(express.json())
 
app.use(morgan("tiny"));
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ urlencoded: true }));


// Home page landing
app.get('/', (req, res) => {
    res.send('Under Construction wait');
});

const contactRouter = require('./Router/Contact-message');
 
app.use("/contact",contactRouter);
 

//Server
app.listen(process.env.PORT,()=>{
    console.log("Server running at http://localhost:4000".yellow.underline.bold);

});


