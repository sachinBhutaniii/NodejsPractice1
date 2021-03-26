const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
//importing routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const adminRoute = require("./routes/admin");

//express validator
//const { check, validationResult } = require("express-validator");

dotenv.config();

//connnect to DB

mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(result => console.log("Connected to DB"))
  .catch(err => console.log("error"));

//Middleware
// app.use(express.json());
app.use(bodyParser.json());
//route middlewares
app.use("/api/user", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/admin", adminRoute);

app.listen(3000, () => console.log("Server running at 3000..."));
