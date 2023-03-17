const express = require("express");
const morgan = require("morgan");
const app = express();
const connectDB = require("./Config/db");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser")
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
app.use(cookieParser())
app.use(morgan("tiny"));
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ urlencoded: true }));
// Home page landing
app.get('/', (req, res) => {
    res.send('Under Construction wait');
});


//Server
app.listen(process.env.PORT,()=>{
    console.log("Server running at http://localhost:4000".yellow.underline.bold);

});